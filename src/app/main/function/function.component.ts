import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { MessageContstants } from '../../core/common/message.constants';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;

  @ViewChild(TreeComponent)
  public treeFunction: TreeComponent;

  public _functionHierachy: any[];
  public _functions: any[];
  public entity: any;
  public editFlag: boolean;
  public filter = '';

  constructor(
    private _dataService: DataService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService) { }

  ngOnInit() {
    this.search();
  }

  // Show add form
  public showAddModal() {
    this.entity = {};
    this.addEditModal.show();
    this.editFlag = false;
  }

  // Load data
  public search() {
    this._dataService.get('/api/function/getall?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this._functions = response.filter(x => x.ParentId == null);
        this._functionHierachy = this._utilityService.Unflatten(response);
      }, error => this._dataService.handleError(error));
  }

  // Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      if (this.editFlag === false) {
        this._dataService.post('/api/function/add', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.search();
            this.addEditModal.hide();
            this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      } else {
        this._dataService.put('/api/function/update', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.search();
            this.addEditModal.hide();
            this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          }, error => this._dataService.handleError(error));

      }
    }
  }

  // Show edit form
  public showEdit(id: string) {
    this._dataService.get('/api/function/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        this.editFlag = true;
        this.addEditModal.show();
      }, error => this._dataService.handleError(error));
  }

  // Action delete
  public deleteConfirm(id: string): void {
    this._dataService.delete('/api/function/delete', 'id', id)
      .subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.search();
      }, error => this._dataService.handleError(error));
  }
  // Click button delete turn on confirm
  public delete(id: string) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG,
      () => this.deleteConfirm(id));
  }
}
