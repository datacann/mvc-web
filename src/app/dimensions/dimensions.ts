export interface Dimension {
  width: number;
  length: number;
  height: number;
}

export const DIMENSIONS = {
  carton: { width: 12, length: 12, height: 12 },
  box: { width: 24, length: 16, height: 12 },
  pallet: { width: 40, length: 48, height: 60 },
};
