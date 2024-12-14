import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    NzButtonModule,
    NzModalModule,
    NzMessageModule,
    NzIconService,
    // Animasyon modülleri burada
    // NoopAnimationsModule,   // Animasyonları devre dışı bırakmak için
  ]
};