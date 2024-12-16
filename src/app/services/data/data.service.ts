import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private savedDataSubject = new BehaviorSubject<any[]>([]);
  updateState(data: any[]) {
    const updatedData = [...this.savedDataSubject.getValue(), ...data];
    sessionStorage.setItem('savedData', JSON.stringify(updatedData));
  }

  getState() {
    const savedData = sessionStorage.getItem('savedData');
    return savedData ? JSON.parse(savedData) : [];
  }
}
