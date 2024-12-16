import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  getDropdownItems(): Observable<any> {
    return of([
      { dataKey: 'modes', items: ['LCL', 'FCL', 'Air'], label: 'Mode of transport' },
      { dataKey: 'movementTypes', items: ['Door to Door', 'Port to Door', 'Door to Port', 'Port to Port'], label: 'Type of movement' },
      { dataKey: 'incoterms', items: ['Delivered Duty Paid (DDP)', 'Delivered At Place (DAT)'], label: 'International commercial terms' },
      { dataKey: 'packageTypes', items: ['Pallets', 'Boxes', 'Cartons'], label: 'Type of package' },
      { dataKey: 'units1', items: ['CM', 'IN'], label: 'Measurement unit for dimensions' },
      { dataKey: 'units2', items: ['KG', 'LB'], label: 'Measurement unit for weight' },
      { dataKey: 'currencies', items: ['USD - US Dollar', 'CNY - Chinese Yuan', 'TRY - Turkish Lira'], label: 'Currency types' },
    ]);
  }

  getInfoExplanations(): Observable<{ [key: string]: string }> {
    return of({
      modes: 'Modes describe the shipment type: LCL (Less Container Load), FCL (Full Container Load), Air.',
      movementTypes: 'Movement type defines the logistics: Door to Door, Port to Door, etc.',
      incoterms: 'Incoterms define the responsibilities of buyers and sellers in shipping.',
      countriesCities: 'Choose from predefined countries and their respective cities.',
      packageTypes: 'Package type indicates the packaging method for shipment.',
      units1: 'Units of measurement for dimensions (e.g., CM, IN).',
      units2: 'Units of measurement for weight (e.g., KG, LB).',
      currencies: 'Currency options for the transaction.',
    });
  }
}
