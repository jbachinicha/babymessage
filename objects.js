// ── Object Creation Functions ──────────────────────────────────────────────
import { rnd, pick, PLANET_R } from './utils.js';
import { placeOnPlanet, surfaceY } from './placement.js';

// ── Trees ──────────────────────────────────────────────────────────────────
export function makeTree(x, z, sc) {
  sc = sc||1;
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07*sc,0.1*sc,0.55*sc,8), new THREE.MeshLambertMaterial({color:0x9a6840}));
  trunk.position.y = 0.28*sc; trunk.castShadow = true; g.add(trunk);
  const leafMat = new THREE.MeshLambertMaterial({color:pick([0x7ecfa4,0x94dab4,0xb0e8c4,0x68c090])});
  for(let i=0;i<3;i++){
    const b = new THREE.Mesh(new THREE.SphereGeometry((0.22+i*0.04)*sc,9,7), leafMat);
    b.position.set(rnd(-0.12,0.12)*sc,(0.56+i*0.2)*sc,rnd(-0.12,0.12)*sc); b.castShadow=true; g.add(b);
  }
  g.position.set(x,0.97,z); return g;
}

export function makeSnowTree(x, z, sc) {
  sc = sc||1;
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07*sc,0.1*sc,0.55*sc,8), new THREE.MeshLambertMaterial({color:0x6d5843}));
  trunk.position.y = 0.28*sc; trunk.castShadow = true; g.add(trunk);
  const snowLeafColors = [0xffffff, 0xf0f8ff, 0xe8f4fa, 0xdceef5];
  for(let i=0;i<3;i++){
    const leafMat = new THREE.MeshLambertMaterial({color:pick(snowLeafColors)});
    const b = new THREE.Mesh(new THREE.SphereGeometry((0.22+i*0.04)*sc,9,7), leafMat);
    b.position.set(rnd(-0.12,0.12)*sc,(0.56+i*0.2)*sc,rnd(-0.12,0.12)*sc); 
    b.castShadow=true; 
    b.receiveShadow=true;
    g.add(b);
  }
  g.position.set(x,0.97,z); return g;
}

// ── Flowers ────────────────────────────────────────────────────────────────
export function makeFlower(x, z) {
  const g = new THREE.Group();
  const sc = rnd(0.8, 1.3);

  // Stem
  const stemMat = new THREE.MeshLambertMaterial({color:0x5aad72});
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025*sc,0.035*sc,0.5*sc,8), stemMat);
  stem.position.y = 0.25*sc;
  stem.castShadow = true;
  stem.receiveShadow = true;
  g.add(stem);

  // Leaf
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0,0); leafShape.bezierCurveTo(0.08,0.1,0.15,0.18,0,0.22);
  leafShape.bezierCurveTo(-0.08,0.14,-0.06,0.06,0,0);
  const leafGeo = new THREE.ShapeGeometry(leafShape);
  const leafMesh = new THREE.Mesh(leafGeo, new THREE.MeshLambertMaterial({color:0x68b870,side:THREE.DoubleSide}));
  leafMesh.scale.setScalar(sc);
  leafMesh.position.set(0.12*sc, 0.22*sc, 0);
  leafMesh.rotation.z = -0.4;
  leafMesh.castShadow = true;
  leafMesh.receiveShadow = true;
  g.add(leafMesh);

  // Petals
  const petalColor = pick([0xffadd4,0xffbfe4,0xff9ec8,0xffdce8,0xe8b0ff,0xffccaa,0xff85b3]);
  const petalMat = new THREE.MeshLambertMaterial({color:petalColor});
  for(let i=0;i<6;i++){
    const a = (i/6)*Math.PI*2;
    const petal = new THREE.Mesh(new THREE.SphereGeometry(0.095*sc,8,6), petalMat);
    petal.position.set(Math.cos(a)*0.17*sc, 0.52*sc, Math.sin(a)*0.17*sc);
    petal.scale.set(1, 0.55, 1.5);
    petal.castShadow = true;
    petal.receiveShadow = true;
    g.add(petal);
  }

  // Center disk
  const center = new THREE.Mesh(new THREE.CylinderGeometry(0.1*sc,0.1*sc,0.05*sc,12),
    new THREE.MeshLambertMaterial({color:0xffdd55}));
  center.position.y = 0.54*sc;
  center.castShadow = true;
  center.receiveShadow = true;
  g.add(center);

  // Stamen dots
  for(let i=0;i<5;i++){
    const a = (i/5)*Math.PI*2;
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.022*sc,5,4),
      new THREE.MeshLambertMaterial({color:0xff9900}));
    dot.position.set(Math.cos(a)*0.07*sc, 0.58*sc, Math.sin(a)*0.07*sc);
    dot.castShadow = true;
    dot.receiveShadow = true;
    g.add(dot);
  }

  g.position.set(x, 0.97, z);
  const fSpin = rnd(0, Math.PI*2);
  placeOnPlanet(g, x, z, fSpin);
  return g;
}

// ── House ──────────────────────────────────────────────────────────────────
export function makeHouse(x, z) {
  const g = new THREE.Group();
  const scale = 3.5; // Scale factor for size
  
  // Foundation
  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(0.4*scale, 0.06*scale, 0.4*scale),
    new THREE.MeshLambertMaterial({color: 0x8b7355})
  );
  foundation.position.y = 0.03*scale;
  foundation.castShadow = true;
  g.add(foundation);
  
  // Walls (main body)
  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(0.36*scale, 0.36*scale, 0.36*scale),
    new THREE.MeshLambertMaterial({color: 0xf5e6d3})
  );
  walls.position.y = 0.24*scale;
  walls.castShadow = true;
  g.add(walls);
  
  // Door
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.12*scale, 0.2*scale, 0.02*scale),
    new THREE.MeshLambertMaterial({color: 0xc84b31})
  );
  door.position.set(0, 0.14*scale, 0.19*scale);
  door.castShadow = true;
  g.add(door);
  
  // Door handle (small sphere)
  const doorHandle = new THREE.Mesh(
    new THREE.SphereGeometry(0.015*scale, 6, 6),
    new THREE.MeshLambertMaterial({color: 0xffd700})
  );
  doorHandle.position.set(0.065*scale, 0.14*scale, 0.21*scale);
  g.add(doorHandle);
  
  // Window
  const window1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.08*scale, 0.08*scale, 0.02*scale),
    new THREE.MeshLambertMaterial({color: 0x87ceeb})
  );
  window1.position.set(-0.11*scale, 0.27*scale, 0.19*scale);
  window1.castShadow = true;
  g.add(window1);
  
  // Roof (triangular)
  const roofGeometry = new THREE.ConeGeometry(0.28*scale, 0.24*scale, 4);
  const roof = new THREE.Mesh(roofGeometry, new THREE.MeshLambertMaterial({color: 0xff6b9d}));
  roof.position.y = 0.48*scale;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  g.add(roof);
  
  // Chimney
  const chimney = new THREE.Mesh(
    new THREE.BoxGeometry(0.06*scale, 0.2*scale, 0.06*scale),
    new THREE.MeshLambertMaterial({color: 0xa0522d})
  );
  chimney.position.set(0.12*scale, 0.5*scale, 0.08*scale);
  chimney.castShadow = true;
  g.add(chimney);
  
  g.position.set(x, 0.97, z);
  placeOnPlanet(g, x, z);
  return g;
}

// ── Hearts ─────────────────────────────────────────────────────────────────
export function makeHeart(size, color) {
  size = size||0.3;
  const s = size;
  const sh = new THREE.Shape();
  sh.moveTo(0,s*0.6);
  sh.bezierCurveTo(s*0.05,s,s*0.7,s,s*0.7,s*0.5);
  sh.bezierCurveTo(s*0.7,s*0.2,s*0.4,-s*0.1,0,-s*0.6);
  sh.bezierCurveTo(-s*0.4,-s*0.1,-s*0.7,s*0.2,-s*0.7,s*0.5);
  sh.bezierCurveTo(-s*0.7,s,-s*0.05,s,0,s*0.6);
  const geo = new THREE.ExtrudeGeometry(sh,{depth:size*0.28,bevelEnabled:true,bevelSize:0.018,bevelThickness:0.018,bevelSegments:3});
  geo.center();
  return new THREE.Mesh(geo, new THREE.MeshLambertMaterial({color:color||pick([0xff6b9d,0xff8cb4,0xffb0cc,0xff4d80])}));
}

// ── Text Sprite ────────────────────────────────────────────────────────────
export function makeTextSprite(text, options = {}) {
  const W = options.width || 512;
  const H = options.height || 128;
  const fontSize = options.fontSize || 46;
  const fillColor = options.fillColor || '#e84d88';
  const scaleX = options.scaleX || 5.5;
  const scaleY = options.scaleY || 1.375;
  const lineHeight = options.lineHeight || Math.round(fontSize * 1.2);
  const cvs=document.createElement('canvas');
  cvs.width=W; cvs.height=H;
  const ctx=cvs.getContext('2d');
  ctx.shadowColor='rgba(255,120,160,0.6)'; ctx.shadowBlur=18;
  ctx.font=`bold ${fontSize}px Georgia,serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.strokeStyle='rgba(255,255,255,0.9)'; ctx.lineWidth=5;
  const lines = Array.isArray(text) ? text : String(text).split('\n');
  const totalHeight = (lines.length - 1) * lineHeight;
  const startY = H / 2 - totalHeight / 2;
  lines.forEach((line, i) => {
    const y = startY + i * lineHeight;
    ctx.strokeText(line, W / 2, y);
    ctx.fillStyle = fillColor;
    ctx.fillText(line, W / 2, y);
  });
  const tex=new THREE.CanvasTexture(cvs);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true}));
  sp.scale.set(scaleX,scaleY,1); return sp;
}

// ── Clouds ─────────────────────────────────────────────────────────────────
export function makeCloud(x,y,z,sc){
  sc=sc||1; const g=new THREE.Group();
  const mat=new THREE.MeshLambertMaterial({color:0xfff0f8});
  [[0,0,0,1.0],[-1.1,0,0,0.75],[1.1,0,0,0.75],[-0.6,0.45,0,0.65],[0.6,0.45,0,0.65]]
  .forEach(([ox,oy,oz,r])=>{
    const m=new THREE.Mesh(new THREE.SphereGeometry(r*0.65*sc,8,6),mat);
    m.position.set(ox*sc,oy*sc,oz*sc); g.add(m);
  }); g.position.set(x,y,z); return g;
}

// ── Penguin ────────────────────────────────────────────────────────────────
export function makePenguin() {
  const root = new THREE.Group();
  const black = new THREE.MeshLambertMaterial({color:0x88c8f0});
  const white = new THREE.MeshLambertMaterial({color:0xf5f0ff});
  const orange= new THREE.MeshLambertMaterial({color:0xff9944});
  const pink  = new THREE.MeshLambertMaterial({color:0xffaacc});

  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.28,12,10), black);
  body.scale.set(1,1.18,0.9); body.position.y=0.3; root.add(body);

  // Belly patch
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.19,10,8), white);
  belly.scale.set(1,1.1,0.6); belly.position.set(0,0.32,0.18); root.add(belly);

  // Head
  const head = new THREE.Group();
  const headBall = new THREE.Mesh(new THREE.SphereGeometry(0.19,12,10), black);
  headBall.position.set(0,0.62,0); head.add(headBall);

  // Face white patch
  const face = new THREE.Mesh(new THREE.SphereGeometry(0.13,10,8), white);
  face.scale.set(1,1,0.5); face.position.set(0,0.62,0.14); head.add(face);

  // Eyes
  [-1,1].forEach(side=>{
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.033,7,6),
      new THREE.MeshLambertMaterial({color:0x111111}));
    eye.position.set(side*0.08,0.67,0.16); head.add(eye);
    const shine = new THREE.Mesh(new THREE.SphereGeometry(0.012,5,4),
      new THREE.MeshLambertMaterial({color:0xffffff}));
    shine.position.set(side*0.085,0.675,0.185); head.add(shine);
  });

  // Blush
  [-1,1].forEach(side=>{
    const blush = new THREE.Mesh(new THREE.SphereGeometry(0.035,6,5), pink);
    blush.scale.set(1,0.5,0.3); blush.position.set(side*0.11,0.625,0.175); head.add(blush);
  });

  // Beak
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.045,0.09,6), orange);
  beak.rotation.x=Math.PI/2; beak.position.set(0,0.615,0.23); head.add(beak);

  root.add(head);
  root._head = head;

  // Wings
  const wingL = new THREE.Group(), wingR = new THREE.Group();
  const wgL = new THREE.Mesh(new THREE.SphereGeometry(0.12,8,6),black);
  wgL.scale.set(0.45,0.9,0.3); wgL.position.set(0,-0.05,0); wingL.add(wgL);
  wingL.position.set(-0.28,0.38,0); root.add(wingL);

  const wgR = new THREE.Mesh(new THREE.SphereGeometry(0.12,8,6),black);
  wgR.scale.set(0.45,0.9,0.3); wgR.position.set(0,-0.05,0); wingR.add(wgR);
  wingR.position.set(0.28,0.38,0); root.add(wingR);

  root._wingL=wingL; root._wingR=wingR;

  // Feet
  const footL = new THREE.Group(), footR = new THREE.Group();
  [footL,footR].forEach((f,i)=>{
    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.065,7,5), orange);
    foot.scale.set(1.4,0.4,1.1); f.add(foot);
    f.position.set(i===0?-0.1:0.1,0.04,0.05); root.add(f);
  });
  root._footL=footL; root._footR=footR;

  return root;
}
