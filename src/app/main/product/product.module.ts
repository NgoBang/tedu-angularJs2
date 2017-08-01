import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { DataService } from '../../core/services/data.service';
import { UtilityService } from '../../core/services/utility.service';
import { UploadService } from '../../core/services/upload.service';
import { ProductComponent } from './product.component';
import { ProductRouter } from './product.routes';
import { SimpleTinyComponent } from './../../shared/simple-tiny/simple-tiny.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRouter,
    FormsModule,
    PaginationModule,
    ModalModule,
    Daterangepicker,
    MultiselectDropdownModule
  ],
  declarations: [ProductComponent, SimpleTinyComponent],
  providers: [DataService, UtilityService, UploadService]
})
export class ProductModule { }
