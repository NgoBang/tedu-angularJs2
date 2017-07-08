import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { TreeModule } from 'angular-tree-component';

import { FunctionComponent } from './function.component';

const functionRoutes: Routes = [
  // localhost:4200/main/function
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  // localhost:4200/main/function/index
  { path: 'index', component: FunctionComponent }
]

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    FormsModule,
    ModalModule,
    RouterModule.forChild(functionRoutes)
  ],
  declarations: [FunctionComponent]
})
export class FunctionModule { }
