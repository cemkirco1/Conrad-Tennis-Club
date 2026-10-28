// Arka plan sahnesi (three.js): iki raket topu birbirine atar, top karşı sahada sekip kil tozu kaldırır.
// Her şey kaydırma konumuna kilitlidir (GSAP ScrollTrigger); sahne yalnızca kaydırma ve yeniden boyutlanmada çizilir.
import {
  ACESFilmicToneMapping, BufferAttribute, BufferGeometry, CanvasTexture,
  CatmullRomCurve3, Color, CylinderGeometry, Curve, DirectionalLight, DoubleSide, Group,
  HemisphereLight, MathUtils, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, NormalBlending, PerspectiveCamera,
  PlaneGeometry, Points, PointsMaterial, SRGBColorSpace, Scene, SphereGeometry, TubeGeometry, Vector3,
  WebGLRenderer,
} from 'three';
import { ScrollTrigger } from '../lib/gsap.js';

const RALLY_PX = 1300; // bir tam gidiş-dönüş için kaydırma mesafesi
const PHASE = 0.5; //     sayfa açıldığında top sağ rakette, sağ alt köşe dolu
const RACKET_LEN = 6.8;
const HEAD_Y = 5.0;
const HEAD_RX = 1.22;
const HEAD_RY = 1.58;
const BALL_R = 0.36;
const BOUNCE_T = 0.62; // vuruştan sonra yolun yüzde kaçında top yere değer
const DUST_SPAN = 0.32;
const DUST_COUNT = 90;

const COLORS = {
  green: '#173F30',
  ink: '#0F2A21',
  clay: '#B04D2B',
  clayDark: '#8E3A1F',
  dust: '#C8653D',
  ball: '#D8EC3E',
  seam: '#F6F6EE',
};

// Raket açısı (derece); f = 0.5 vuruş anı
function angleAt(f) {
  if (f < 0.42) return -25 - 30 * (f / 0.42);
  if (f < 0.56) return -55 + 125 * (1 - Math.pow(1 - (f - 0.42) / 0.14, 3));
  return 70 - 95 * ((f - 0.56) / 0.44);
}

// Raketin sap ekseni etrafında dönüşü: yüz, vuruşta topa döner
function yawAt(f) {
  if (f < 0.42) return 0.1 - 0.4 * (f / 0.42);
  if (f < 0.56) return -0.3 + 1.2 * (1 - Math.pow(1 - (f - 0.42) / 0.14, 3));
  return 0.9 - 0.8 * ((f - 0.56) / 0.44);
}

class EllipseCurve3 extends Curve {
  constructor(rx, ry, cy) { super(); this.rx = rx; this.ry = ry; this.cy = cy; }
  getPoint(t, target = new Vector3()) {
    const a = t * Math.PI * 2;
    return target.set(this.rx * Math.cos(a), this.cy + this.ry * Math.sin(a), 0);
  }
}

class HelixCurve extends Curve {
  constructor(r, y0, y1, turns) { super(); Object.assign(this, { r, y0, y1, turns }); }
  getPoint(t, target = new Vector3()) {
    const a = t * this.turns * Math.PI * 2;
    return target.set(this.r * Math.cos(a), this.y0 + t * (this.y1 - this.y0), this.r * Math.sin(a));
  }
}

// Tenis topu dikişi: küre üzerinde kalan kapalı eğri (a + b = 1)
class SeamCurve extends Curve {
  constructor(radius) { super(); this.radius = radius; }
  getPoint(t, target = new Vector3()) {
    const a = 0.75;
    const b = 0.25;
    const th = t * Math.PI * 2;
    return target
      .set(
        a * Math.cos(th) + b * Math.cos(3 * th),
        a * Math.sin(th) - b * Math.sin(3 * th),
        2 * Math.sqrt(a * b) * Math.sin(2 * th),
      )
      .multiplyScalar(this.radius);
  }
}

function canvasTexture(width, height, draw) {
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  draw(c.getContext('2d'), width, height);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function stringTexture() {
  return canvasTexture(512, 660, (ctx, w, h) => {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(w / 2, h / 2, w / 2 - 2, h / 2 - 2, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.strokeStyle = 'rgba(15, 42, 33, 0.82)';
    ctx.lineWidth = 4;
    for (let i = 1; i < 17; i++) {
      const x = (w / 17) * i;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    ctx.lineWidth = 3;
    for (let j = 1; j < 20; j++) {
      const y = (h / 20) * j;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    ctx.restore();
  });
}

function feltTexture() {
  return canvasTexture(256, 128, (ctx, w, h) => {
    const img = ctx.createImageData(w, h);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 150 + Math.random() * 105;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  });
}

function dotTexture() {
  return canvasTexture(64, 64, (ctx, w) => {
    const g = ctx.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.45, 'rgba(255,255,255,0.55)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, w);
  });
}

export function createRally(canvas, { reduced = false } = {}) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    return null; // WebGL yoksa sayfa sahnesiz devam eder
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const disposables = [];
  const keep = (o) => { disposables.push(o); return o; };

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 22);

  scene.add(new HemisphereLight(0xfbfaf5, 0xc8653d, 1.7));
  const key = new DirectionalLight(0xffffff, 2.6);
  key.position.set(-8, 12, 14);
  const rim = new DirectionalLight(0xdfe9ff, 1.2);
  rim.position.set(9, -3, -8);
  scene.add(key, rim);

  const strings = keep(stringTexture());

  function buildRacket({ frame, grip, wrap, mirrored }) {
    const side = new Group();
    const tilt = new Group();
    const swing = new Group();
    const model = new Group();
    side.add(tilt);
    tilt.add(swing);
    swing.add(model);
    if (mirrored) side.rotation.y = Math.PI;
    tilt.rotation.x = mirrored ? -0.22 : 0.22; // baş hafifçe kameraya eğilir

    const frameMat = keep(new MeshPhysicalMaterial({
      color: frame, roughness: 0.32, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.18,
    }));
    const gripMat = keep(new MeshStandardMaterial({ color: grip, roughness: 0.88 }));
    const wrapMat = keep(new MeshStandardMaterial({ color: wrap, roughness: 0.9 }));

    const head = new Mesh(keep(new TubeGeometry(new EllipseCurve3(HEAD_RX, HEAD_RY, HEAD_Y), 220, 0.09, 12, true)), frameMat);
    head.scale.z = 1.8;
    model.add(head);

    for (const dir of [-1, 1]) {
      const throat = new CatmullRomCurve3([
        new Vector3(dir * 1.0, 4.1, 0),
        new Vector3(dir * 0.42, 3.15, 0),
        new Vector3(dir * 0.13, 2.62, 0),
      ]);
      const t = new Mesh(keep(new TubeGeometry(throat, 40, 0.078, 10, false)), frameMat);
      t.scale.z = 1.6;
      model.add(t);
    }

    const handle = new Mesh(keep(new CylinderGeometry(0.17, 0.19, 2.75, 8)), gripMat);
    handle.position.y = 1.375;
    const collar = new Mesh(keep(new CylinderGeometry(0.205, 0.205, 0.1, 8)), frameMat);
    collar.position.y = 2.72;
    const cap = new Mesh(keep(new CylinderGeometry(0.215, 0.215, 0.14, 8)), frameMat);
    cap.position.y = 0.07;
    const overgrip = new Mesh(keep(new TubeGeometry(new HelixCurve(0.185, 0.2, 2.6, 9), 360, 0.016, 6, false)), wrapMat);
    model.add(handle, collar, cap, overgrip);

    const bed = new Mesh(
      keep(new PlaneGeometry(HEAD_RX * 2 * 0.95, HEAD_RY * 2 * 0.95)),
      keep(new MeshStandardMaterial({
        map: strings, transparent: true, alphaTest: 0.04, side: DoubleSide, roughness: 0.55, depthWrite: false,
      })),
    );
    bed.position.y = HEAD_Y;
    model.add(bed);

    return { side, swing, model, mirrored };
  }

  const left = buildRacket({ frame: COLORS.green, grip: COLORS.clay, wrap: COLORS.clayDark, mirrored: false });
  const right = buildRacket({ frame: COLORS.clay, grip: COLORS.green, wrap: COLORS.ink, mirrored: true });
  scene.add(left.side, right.side);

  const ball = new Group();
  const felt = keep(feltTexture());
  ball.add(
    new Mesh(
      keep(new SphereGeometry(BALL_R, 48, 32)),
      keep(new MeshPhysicalMaterial({
        color: COLORS.ball, roughness: 0.95, bumpMap: felt, bumpScale: 0.6,
        sheen: 1, sheenRoughness: 0.45, sheenColor: new Color('#F7FFC4'),
      })),
    ),
    new Mesh(
      keep(new TubeGeometry(new SeamCurve(BALL_R * 1.004), 220, 0.022, 6, true)),
      keep(new MeshStandardMaterial({ color: COLORS.seam, roughness: 0.8 })),
    ),
  );
  scene.add(ball);

  // Kil tozu: top yere değdiğinde kalkan küçük bulut
  const dustDirs = new Float32Array(DUST_COUNT * 3);
  for (let i = 0; i < DUST_COUNT; i++) {
    dustDirs[i * 3] = (Math.random() * 2 - 1) * 1.1;
    dustDirs[i * 3 + 1] = 0.25 + Math.random() * 0.9;
    dustDirs[i * 3 + 2] = (Math.random() * 2 - 1) * 0.7;
  }
  const dustGeo = keep(new BufferGeometry());
  const dustPos = new Float32Array(DUST_COUNT * 3);
  dustGeo.setAttribute('position', new BufferAttribute(dustPos, 3));
  const dustMat = keep(new PointsMaterial({
    color: COLORS.dust, map: keep(dotTexture()), size: 0.22, transparent: true,
    depthWrite: false, opacity: 0, blending: NormalBlending,
  }));
  const dust = new Points(dustGeo, dustMat);
  dust.frustumCulled = false;
  scene.add(dust);

  const L = {
    s: 1, bs: 1, floorY: 0, hA: 0, hB: 0, depth: 2.2,
    contactL: new Vector3(), contactR: new Vector3(),
  };
  const tmp = new Vector3();
  const normal = new Vector3();

  function setPose(r, f) {
    r.swing.rotation.z = -MathUtils.degToRad(angleAt(f));
    r.model.rotation.y = yawAt(f);
  }

  function contactOf(r, towardX) {
    setPose(r, 0.5);
    r.side.updateMatrixWorld(true);
    const head = r.model.localToWorld(tmp.set(0, HEAD_Y, 0)).clone();
    normal.set(0, 0, 1).transformDirection(r.model.matrixWorld);
    if (normal.x * towardX < 0) normal.negate();
    return head.addScaledVector(normal, BALL_R * L.bs + 0.12 * L.s);
  }

  // retreat: ilk ekran kayıp giderken (0 → 1) raketler kenarlara çekilir ve küçülür; metnin önünden çekilir.
  const base = { halfW: 1, halfH: 1, s: 1 };
  let placedRetreat = -1;

  function layout() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    base.halfH = Math.tan(MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    base.halfW = base.halfH * camera.aspect;
    base.s = Math.min((2 * base.halfH * 0.62) / RACKET_LEN, (2 * base.halfW * 0.72) / RACKET_LEN);
    placedRetreat = -1;
  }

  function place(retreat) {
    if (Math.abs(retreat - placedRetreat) < 0.002) return;
    placedRetreat = retreat;
    const { halfW, halfH } = base;
    const s = base.s * (1 - 0.22 * retreat);
    L.s = s;
    L.bs = Math.max(0.75, s);
    const edge = (camera.aspect < 0.8 ? 0.9 : 0.86) + 0.16 * retreat;
    left.side.position.set(-halfW * edge, -halfH * 1.04, 0);
    right.side.position.set(halfW * edge, -halfH * 1.04, 0);
    left.side.scale.setScalar(s);
    right.side.scale.setScalar(s);
    ball.scale.setScalar(L.bs);
    L.contactL.copy(contactOf(left, 1));
    L.contactR.copy(contactOf(right, -1));
    L.floorY = -halfH * 0.86;
    L.hA = halfH * 0.85;
    L.hB = halfH * 0.22;
    dustMat.size = 0.22 * L.bs;
  }

  const hero = document.getElementById('top');
  function retreatAt() {
    if (!hero) return 0;
    const r = hero.getBoundingClientRect();
    return MathUtils.clamp((-r.top - r.height * 0.4) / (r.height * 0.5), 0, 1);
  }

  function bounceOf(from, to) {
    return tmp.set(from.x + (to.x - from.x) * BOUNCE_T, L.floorY, from.z + (to.z - from.z) * BOUNCE_T - L.depth * Math.sin(Math.PI * BOUNCE_T));
  }

  function draw(scrollY) {
    place(reduced ? 0 : retreatAt());
    const p = scrollY / RALLY_PX + PHASE;
    const u = p - Math.floor(p);
    setPose(left, (u + 0.5) % 1); // sol raket u = 0'da vurur
    setPose(right, u); //           sağ raket u = 0.5'te vurur

    const first = u < 0.5;
    const t = first ? u / 0.5 : (u - 0.5) / 0.5;
    const from = first ? L.contactL : L.contactR;
    const to = first ? L.contactR : L.contactL;
    let y;
    if (t < BOUNCE_T) {
      const s = t / BOUNCE_T;
      y = from.y + (L.floorY - from.y) * s + 4 * L.hA * s * (1 - s);
    } else {
      const s = (t - BOUNCE_T) / (1 - BOUNCE_T);
      y = L.floorY + (to.y - L.floorY) * s + 4 * L.hB * s * (1 - s);
    }
    ball.position.set(
      from.x + (to.x - from.x) * t,
      y + BALL_R * L.bs, // top yere merkeziyle değil, yüzeyiyle değer
      from.z + (to.z - from.z) * t - L.depth * Math.sin(Math.PI * t),
    );
    ball.rotation.set(p * 7.0, p * 11.0, p * 3.0);

    const k = (t - BOUNCE_T) / DUST_SPAN;
    if (k >= 0 && k <= 1) {
      const origin = bounceOf(from, to);
      const spread = 1.6 * L.bs;
      for (let i = 0; i < DUST_COUNT; i++) {
        dustPos[i * 3] = origin.x + dustDirs[i * 3] * k * spread;
        dustPos[i * 3 + 1] = origin.y + dustDirs[i * 3 + 1] * k * spread - 0.9 * k * k * L.bs;
        dustPos[i * 3 + 2] = origin.z + dustDirs[i * 3 + 2] * k * spread;
      }
      dustGeo.attributes.position.needsUpdate = true;
      dustMat.opacity = 0.75 * Math.pow(1 - k, 1.4);
      dust.visible = true;
    } else {
      dust.visible = false;
    }

    renderer.render(scene, camera);
  }

  let lastY = 0;
  const redraw = () => draw(reduced ? RALLY_PX * 0.3 : lastY);

  layout();
  lastY = window.scrollY;
  redraw();

  const onResize = () => { layout(); redraw(); };
  window.addEventListener('resize', onResize);

  const trigger = reduced
    ? null
    : ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => { lastY = self.scroll(); redraw(); },
    });

  return {
    destroy() {
      trigger?.kill();
      window.removeEventListener('resize', onResize);
      disposables.forEach((d) => d.dispose?.());
      renderer.dispose();
    },
  };
}
