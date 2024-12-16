import { Injectable } from '@angular/core';
import {Dimension} from '../../dimensions/dimensions';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  inchesToCm(inches: number): number {
    return inches * 2.54;
  }

  calculateBoxCount(carton: Dimension, box: Dimension): number {
    const widthCount = Math.floor(box.width / carton.width);
    const lengthCount = Math.floor(box.length / carton.length);
    const heightCount = Math.floor(box.height / carton.height);
    return widthCount * lengthCount * heightCount;
  }

  calculatePalletCount(box: Dimension, pallet: Dimension): number {
    const widthCount = Math.floor(pallet.width / box.width);
    const lengthCount = Math.floor(pallet.length / box.length);
    const heightCount = Math.floor(pallet.height / box.height);
    return widthCount * lengthCount * heightCount;
  }

  checkMode(mode: string, palletCount: number): string {
    if (mode === 'LCL' && palletCount >= 24) {
      return 'Error: You need to choose FCL if pallet count is greater than or equal to 24.';
    }
    if (mode === 'FCL' && palletCount > 24) {
      return 'Error: You cannot ship more than 24 pallets with FCL.';
    }
    return 'Mode is valid';
  }
}
