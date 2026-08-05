export const MAP_WIDTH = 2000;
export const MAP_HEIGHT = 1000;

const SCALE = 318.30988618379064;
const TX = 1000;
const TY = 482.3475833333333;
const R = 180 / Math.PI;

export function projectGeo(lon: number, lat: number): [number, number] {
  return [SCALE * (lon / R) + TX, -SCALE * (lat / R) + TY];
}
