import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainRoutes } from './main.routes';
import { HomeModule } from './home/home.module';
import { MainComponent } from './main.component';
import { UserModule } from './user/user.module';
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    HomeModule,
    RouterModule.forChild(MainRoutes)
  ],
  providers: [AuthenService, UtilityService],
  declarations: [MainComponent]
})
export class MainModule { }
