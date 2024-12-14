import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const serverConfig: ApplicationConfig = {
  providers: [

      NzButtonModule,               // Button modülünü ekliyoruz
      NzModalModule,                // Modal modülünü ekliyoruz
      NzMessageModule,              // Message modülünü ekliyoruz
      NzIconService,                // Icon servisi
      
    ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
