import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainRoutes } from './main.routes';
import { HomeModule } from './home/home.module';
import { MainComponent } from './main.component';
import { TopMenuComponent } from '../shared/top-menu/top-menu.component';
import { SidebarMenuComponent } from '../shared/sidebar-menu/sidebar-menu.component';
import { UserModule } from './user/user.module';
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';

@NgModule({
  declarations: [
    MainComponent,
    SidebarMenuComponent,
    TopMenuComponent
  ],
  imports: [
    CommonModule,
    UserModule,
    HomeModule,
    RouterModule.forChild(MainRoutes)
  ],
  providers: [AuthenService, UtilityService]
})
export class MainModule { }
