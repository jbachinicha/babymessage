// ── Placement Functions ────────────────────────────────────────────────────
import { PLANET_R } from './utils.js';

export const _surfUp = new THREE.Vector3(0, 1, 0);

export function surfaceY(x, z) {
  return Math.sqrt(Math.max(0, PLANET_R * PLANET_R - x*x - z*z));
}

export function placeOnPlanet(obj, x, z, spinY) {
  const sy = surfaceY(x, z);
  obj.position.set(x, sy, z);
  const normal = new THREE.Vector3(x, sy, z).normalize();
  obj.quaternion.setFromUnitVectors(_surfUp, normal);
  if (spinY !== undefined) {
    obj.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(_surfUp, spinY));
  }
}

export function placeOnSphere(obj, pos) {
  const normal = pos.clone().normalize();
  obj.position.copy(pos);
  obj.quaternion.setFromUnitVectors(_surfUp, normal);
}
