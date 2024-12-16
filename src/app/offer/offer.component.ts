import {ChangeDetectorRef, Component, Inject, NO_ERRORS_SCHEMA, OnInit, PLATFORM_ID, QueryList} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {
  NzDropdownButtonDirective,
  NzDropDownDirective,
  NzDropdownMenuComponent,

} from 'ng-zorro-antd/dropdown';
import {NzIconDirective, NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {OfferService} from '../services/offer/offer.service';
import {CommonModule, NgForOf} from '@angular/common';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {FormsModule} from '@angular/forms';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {DIMENSIONS} from '../dimensions/dimensions';
import {CalculationService} from '../services/calculation/calculation.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {DataService} from '../services/data/data.service';
import {Route, Router, RouterState} from '@angular/router';


interface DropdownData {
  modes: string[];
  movementTypes: string[];
  incoterms: string[];
  packageTypes: string[];
  units1: string[];
  units2: string[];
  currencies: string[];
}
interface DropdownData {
  [key: string]: string[];
}

@Component({
  selector: 'app-offer',
  imports: [
    NzButtonComponent,
    NzMenuModule,
    CommonModule,
    NzDropDownModule,
    NzIconDirective,
    NzButtonModule,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NgForOf,
    NzDropdownButtonDirective,
    FormsModule,
    NzAutocompleteModule,
    NzToolTipModule,
    NzPopoverModule,
    NzIconModule
  ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',

})

export class OfferComponent implements OnInit{
  dropdownData: DropdownData = {
    modes: ['LCL', 'FCL', 'Air'],
    movementTypes: ['Door to Door', 'Port to Door', 'Door to Port', 'Port to Port'],
    incoterms: ['Delivered Duty Paid (DDP)', 'Delivered At Place (DAT)'],
    packageTypes: ['Pallets', 'Boxes', 'Cartons'],
    units1: ['CM', 'IN'],
    units2: ['KG', 'LB'],
    currencies: ['USD - US Dollar', 'CNY - Chinese Yuan', 'TRY - Turkish Lira'],
  };
  selectedItems  = {};
  selectedItemsDr: { [key: string]: string } = {};
  explanations: { [key: string]: string } = {};
  mode: string = 'LCL';
  carton = DIMENSIONS.carton;
  box = DIMENSIONS.box;
  pallet = DIMENSIONS.pallet;
  popoverTitle: string = 'Default Pop-up Title';
  boxCount: number = 0;
  palletCount: number = 0;
  modeMessage: string = '';
  savedData: any[] = [];
  dropdownArray = Object.entries(this.dropdownData).map(([key, value]) => ({
    dataKey: key,
    items: value,
    label: this.explanations[key] || key,
  }));

  constructor(private offerService: OfferService,
              private calculationService: CalculationService,
              private notification: NzNotificationService,
              private dataService: DataService,
              private router: Router,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.offerService.getDropdownItems().subscribe((data) => {
      this.dropdownData = data;
      console.log(this.dropdownData)
    });
    this.offerService.getInfoExplanations().subscribe((data) => {
      this.explanations = data;
      console.log(this.explanations)
    });
  }

  onSelect(dataKey: string, item: string) {
    // @ts-ignore
    this.selectedItems[dataKey] = item;
    this.selectedItemsDr[dataKey] = item;
    console.log(this.selectedItems);
    this.cdRef.detectChanges();

  }

  onCartonSelected() {
    this.boxCount = this.calculationService.calculateBoxCount(this.carton, this.box);
    this.palletCount = this.calculationService.calculatePalletCount(this.box, this.pallet);
    this.checkMode();
  }

  checkMode() {
    this.modeMessage = this.calculationService.checkMode(this.mode, this.palletCount);
  }

  onSave() {
    this.onCartonSelected();
    this.popoverTitle = 'Your New Title After Save';
    if (this.modeMessage.startsWith('Error')) {
      this.createNotification();
    } else {
      let savedData = this.dataService.getState();
      savedData.push(this.selectedItems);
      this.dataService.updateState(savedData);
      this.router.navigate(['/offer-list']);
    }
  }

  createNotification(): void {
    this.notification
      .blank(
        'Error',
        this.modeMessage
      )
      .onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }
}
