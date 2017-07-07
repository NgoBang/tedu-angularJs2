import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

declare var moment: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  public myRoles: string[] = [];
  public pageIndex = 1;
  public pageSize = 20;
  public pageDisplay = 10;
  public totalRow: number;
  public filter = '';
  public users: any[];
  public entity: any;

  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];

  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };

  constructor(
    private _dataService: DataService,
    private _notifycationService: NotificationService) { }

  ngOnInit() {
    this.loadRoles();
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/appUser/getlistpaging?page='
      + this.pageIndex + '&pageSize='
      + this.pageSize + '&filter='
      + this.filter)
      .subscribe((response: any) => {
        this.users = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      });
  }

  loadRoles() {
    this._dataService.get('/api/appRole/getlistall')
      .subscribe((response: any[]) => {
        this.allRoles = [];
        for (const role of response) {
          this.allRoles.push({ id: role.Name, name: role.Description });
        }
      }, error => this._dataService.handleError(error));
  }

  loadUserDetail(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        console.log(this.entity);
        for (const role of this.entity.Roles) {
          this.myRoles.push(role);
        }
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
        console.log(this.entity.BirthDay);
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.loadUserDetail(id);
    this.modalAddEdit.show();
  }

  saveChange(valid: boolean) {
    if (valid) {
      if (this.entity.Id === undefined) {
        this._dataService.post('/api/appUser/add', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notifycationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      } else {
        this._dataService.put('/api/appUser/update', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notifycationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
    }
  }

  deleteItem(id: any) {
    this._notifycationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG,
      () => this.deleteItemConfirm(id));
  }

  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id)
      .subscribe((response: Response) => {
        this._notifycationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadData();
      });
  }

  selectGender(event) {
    this.entity.Gender = event.target.value;
  }
}
