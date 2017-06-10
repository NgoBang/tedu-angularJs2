import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { FunctionComponent } from './function/function.component';
import { RoleComponent } from './role/role.component';
import { ProductComponent } from './product/product.component';
import { mainRoutes } from './main.routes';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes)
  ],
  declarations: [MainComponent, HomeComponent, ProductCategoryComponent, FunctionComponent, RoleComponent, ProductComponent]
})
export class MainModule { }
