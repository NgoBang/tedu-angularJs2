import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { FunctionComponent } from './function/function.component';
import { RoleComponent } from './role/role.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainComponent, HomeComponent, ProductCategoryComponent, FunctionComponent, RoleComponent, ProductComponent]
})
export class MainModule { }
