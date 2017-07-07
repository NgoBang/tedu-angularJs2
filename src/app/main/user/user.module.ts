import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';

const userRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: UserComponent }
]

@NgModule({
  imports: [
    CommonModule,
    PaginationModule,
    FormsModule,
    ModalModule,
    RouterModule.forChild(userRoutes)
  ],
  providers: [DataService, NotificationService],
  declarations: [UserComponent]
})
export class UserModule { }
