import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {OfferComponent} from './offer/offer.component';
import {OfferListComponent} from './offer-list/offer-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'offer', component: OfferComponent },
  { path: 'offer-list', component: OfferListComponent },

];

