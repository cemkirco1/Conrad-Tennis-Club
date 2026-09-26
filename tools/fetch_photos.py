#!/usr/bin/env python3
"""Conrad Tennis Club sitesi için fotoğraf toplayıcı.

İki kaynak:
  openverse  — Openverse API'sinden ticari kullanıma açık (CC) tenis fotoğrafları.
               API anahtarı gerekmez. Her görselin lisansı ve sahibi manifest.json'a yazılır.
  instagram  — @conradtennisclub hesabının son gönderilerindeki görseller (instaloader ile).
               Instagram çoğu zaman oturum ister: --login KULLANICI_ADI verin.

Kullanım:
  pip install requests pillow            # instagram için ayrıca: pip install instaloader
  python tools/fetch_photos.py openverse
  python tools/fetch_photos.py instagram --login kendi_kullanici_adiniz

Görseller design-v2/img/photos/ klasörüne slot adlarıyla kaydedilir
(ör. hero-kortlar.jpg, galeri-3.jpg). Sonra:
  git add design-v2/img/photos && git commit -m "Add photos" && git push
"""

import argparse
import io
import json
import sys
from pathlib import Path

import requests

try:
    from PIL import Image
except ImportError:  # Pillow yoksa görseller olduğu gibi kaydedilir
    Image = None

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "design-v2" / "img" / "photos"
UA = {"User-Agent": "ConradTennisClubSite/1.0 (photo fetcher)"}
MAX_SIDE = 1600

# Sitedeki 13 görsel alanı ve her biri için arama sorgusu
SLOTS = [
    ("hero-kortlar", "clay tennis court"),
    ("hero-ders", "tennis racket balls clay"),
    ("egitim-cocuk", "kids tennis"),
    ("egitim-yetiskin", "tennis lesson coach"),
    ("egitim-cardio", "tennis training drill"),
    ("egitim-mac", "tennis match clay court"),
    ("galeri-1", "tennis court aerial"),
    ("galeri-2", "red clay tennis"),
    ("galeri-3", "tennis balls basket"),
    ("galeri-4", "tennis player serve"),
    ("galeri-5", "tennis net ball"),
    ("galeri-6", "tennis forehand"),
    ("galeri-7", "tennis court trees"),
]


def save_image(data: bytes, name: str) -> Path:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{name}.jpg"
    if Image is None:
        path.write_bytes(data)
        return path
    img = Image.open(io.BytesIO(data)).convert("RGB")
    img.thumbnail((MAX_SIDE, MAX_SIDE))
    img.save(path, "JPEG", quality=84, optimize=True, progressive=True)
    return path


def download(url: str) -> bytes:
    r = requests.get(url, headers=UA, timeout=30)
    r.raise_for_status()
    if not r.headers.get("Content-Type", "").startswith("image/"):
        raise ValueError(f"görsel değil: {r.headers.get('Content-Type')}")
    return r.content


def from_openverse() -> list:
    manifest, used = [], set()
    for slot, query in SLOTS:
        r = requests.get(
            "https://api.openverse.org/v1/images/",
            params={"q": query, "license_type": "commercial", "page_size": 20,
                    "aspect_ratio": "wide,square,tall", "size": "large"},
            headers=UA, timeout=30,
        )
        r.raise_for_status()
        for item in r.json().get("results", []):
            if item["id"] in used:
                continue
            try:
                path = save_image(download(item["url"]), slot)
            except Exception as exc:  # bozuk ya da erişilemeyen görseli atla
                print(f"  atlandı ({exc}): {item['url']}", file=sys.stderr)
                continue
            used.add(item["id"])
            manifest.append({
                "slot": slot, "file": path.name, "title": item.get("title"),
                "creator": item.get("creator"), "license": item.get("license"),
                "license_version": item.get("license_version"),
                "source": item.get("foreign_landing_url"),
            })
            print(f"✓ {slot}: {item.get('title')} — {item.get('creator')} ({item.get('license')})")
            break
        else:
            print(f"✗ {slot}: uygun görsel bulunamadı", file=sys.stderr)
    return manifest


def from_instagram(username: str, login: str | None) -> list:
    try:
        import instaloader
    except ImportError:
        sys.exit("instaloader gerekli: pip install instaloader")
    L = instaloader.Instaloader(download_videos=False, save_metadata=False, quiet=True)
    if login:
        L.interactive_login(login)
    profile = instaloader.Profile.from_username(L.context, username)
    manifest, slots = [], iter(name for name, _ in SLOTS)
    for post in profile.get_posts():
        urls = ([n.display_url for n in post.get_sidecar_nodes() if not n.is_video]
                if post.typename == "GraphSidecar"
                else ([] if post.is_video else [post.url]))
        for url in urls:
            slot = next(slots, None)
            if slot is None:
                return manifest
            path = save_image(download(url), slot)
            manifest.append({"slot": slot, "file": path.name,
                             "source": f"https://www.instagram.com/p/{post.shortcode}/"})
            print(f"✓ {slot}: {post.shortcode}")
    return manifest


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("source", choices=["openverse", "instagram"])
    ap.add_argument("--username", default="conradtennisclub", help="Instagram hesabı")
    ap.add_argument("--login", help="Instagram oturumu için kullanıcı adı (şifre sorulur)")
    args = ap.parse_args()

    manifest = (from_openverse() if args.source == "openverse"
                else from_instagram(args.username, args.login))
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n{len(manifest)}/{len(SLOTS)} görsel kaydedildi → {OUT}")


if __name__ == "__main__":
    main()
