import {Component, OnInit} from '@angular/core';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-offer-list',
  imports: [
    NzTableComponent,
    CommonModule
  ],
  templateUrl: './offer-list.component.html',
  styleUrl: './offer-list.component.css'
})
export class OfferListComponent implements OnInit{
  savedData: any[] = [];
  tableHeaders: string[] = ['Mode', 'Movement Type', 'Incoterms', 'Package Type', 'Unit-1', 'Unit-2','Currency'];

  constructor() {}
  getSavedData() {
    const savedData = sessionStorage.getItem('savedData');
    if (savedData) {
      this.savedData = JSON.parse(savedData).filter(
        (item: any) =>
          Object.keys(item).length > 0 &&
          Object.values(item).some(value => value !== undefined && value !== null && value !== '')
      );
    } else {
    }
  }
  ngOnInit() {
    this.getSavedData();
  }
}
