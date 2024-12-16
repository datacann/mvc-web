import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzLayoutModule
} from 'ng-zorro-antd/layout';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzMenuDirective, NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  imports: [
    NzButtonModule,
    NzModalModule,
    NzMessageModule,
    CommonModule,
    NzMenuModule,
    RouterOutlet,
    NzContentComponent,
    NzBreadCrumbComponent,
    NzIconModule,
    NzLayoutModule,
    NzLayoutComponent,
    NzHeaderComponent,
    NzBreadCrumbItemComponent,
    NzFooterComponent,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-with-ant-design';

  constructor(private modal: NzModalService, private message: NzMessageService,private router: Router) {}


  navigate(path: string) {
    this.router.navigate([path]);
  }
}
