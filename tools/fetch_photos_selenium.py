#!/usr/bin/env python3
"""@conradtennisclub Instagram fotoğraflarını Selenium ile toplar.

Görünür bir Chrome penceresi açar. Instagram giriş isterse pencerede kendiniz
giriş yapın, sonra terminalde Enter'a basın. Script profil sayfasını kaydırır,
gönderi görsellerini toplar ve sitedeki 13 alanın adlarıyla kaydeder.

Kullanım (kendi bilgisayarınızda):
  pip install selenium requests pillow
  python tools/fetch_photos_selenium.py
  git add design-v2/img/photos && git commit -m "Add photos" && git push

Selenium 4, Chrome'a uygun sürücüyü kendisi indirir; ayrıca chromedriver kurmanız gerekmez.
"""

import argparse
import io
import json
import time
from pathlib import Path

import requests
from selenium import webdriver
from selenium.webdriver.common.by import By

try:
    from PIL import Image
except ImportError:
    Image = None

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "design-v2" / "img" / "photos"
SLOTS = ["hero-kortlar", "hero-ders", "egitim-cocuk", "egitim-yetiskin", "egitim-cardio",
         "egitim-mac", "galeri-1", "galeri-2", "galeri-3", "galeri-4", "galeri-5",
         "galeri-6", "galeri-7"]


def save(data: bytes, name: str) -> str:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{name}.jpg"
    if Image is None:
        path.write_bytes(data)
    else:
        img = Image.open(io.BytesIO(data)).convert("RGB")
        img.thumbnail((1600, 1600))
        img.save(path, "JPEG", quality=84, optimize=True, progressive=True)
    return path.name


def collect(driver, want: int, max_scrolls: int) -> list:
    """Profil ızgarasındaki gönderi görsellerinin (kısa kod, en büyük src) listesi."""
    found = {}
    for _ in range(max_scrolls):
        for a in driver.find_elements(By.CSS_SELECTOR, "a[href*='/p/'], a[href*='/reel/']"):
            href = a.get_attribute("href") or ""
            imgs = a.find_elements(By.TAG_NAME, "img")
            if not imgs or href in found:
                continue
            img = imgs[0]
            srcset = img.get_attribute("srcset") or ""
            # srcset içindeki en geniş görseli seç
            best = max((p.strip().split(" ") for p in srcset.split(",") if p.strip()),
                       key=lambda p: int(p[1].rstrip("w")) if len(p) > 1 else 0,
                       default=[img.get_attribute("src")])[0]
            if best:
                found[href] = best
        if len(found) >= want:
            break
        driver.execute_script("window.scrollBy(0, document.body.scrollHeight)")
        time.sleep(2)
    return list(found.items())[:want]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--username", default="conradtennisclub")
    ap.add_argument("--scrolls", type=int, default=15)
    args = ap.parse_args()

    driver = webdriver.Chrome()
    try:
        driver.get(f"https://www.instagram.com/{args.username}/")
        input("Gerekirse açılan pencerede Instagram'a giriş yapın, profil görünür olunca Enter'a basın… ")
        driver.get(f"https://www.instagram.com/{args.username}/")
        time.sleep(3)
        posts = collect(driver, len(SLOTS), args.scrolls)
        ua = {"User-Agent": driver.execute_script("return navigator.userAgent")}
    finally:
        driver.quit()

    manifest = []
    for slot, (href, src) in zip(SLOTS, posts):
        try:
            r = requests.get(src, headers=ua, timeout=30)
            r.raise_for_status()
            manifest.append({"slot": slot, "file": save(r.content, slot), "source": href})
            print(f"✓ {slot}: {href}")
        except Exception as exc:
            print(f"✗ {slot}: {exc}")
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n{len(manifest)}/{len(SLOTS)} görsel kaydedildi → {OUT}")


if __name__ == "__main__":
    main()
