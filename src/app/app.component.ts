import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-root',
  imports: [
    NzButtonModule,
    NzModalModule,
    NzMessageModule,
    // Animasyon modüllerini buraya da eklemeniz gerekebilir
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-with-ant-design';

  constructor(private modal: NzModalService, private message: NzMessageService) {}

  showModal(): void {
    this.modal.info({
      nzTitle: 'Modal Başlığı',
      nzContent: '<p>Bu, bir ng-zorro modal örneğidir.</p>',
      nzOnOk: () => this.message.success('OK tıklandı!')
    });
  }
}