import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GenericService } from 'src/app/business/services/generic.service';
import { Group } from 'src/app/infrastructure/models/group.model';
import { Subject } from 'rxjs';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/business/services/authentication.service';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  
  titlePage: string = 'Groups Management';
  titleTable: string = 'Groups List';
  titleForm: string = 'Add Group';
  groups: Group[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  faTrashAlt = faTrashAlt;
  faPencilAlt = faPencilAlt;
  addUpdateForm: FormGroup;
  isUpdate: boolean = false;
  currentUser: any;
  indexGroupArray = -1;

  // For more information about Datatable Angular please visit the package github : https://l-lin.github.io/angular-datatables/#/welcome

  get f() { return this.addUpdateForm.controls; }

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private genericService: GenericService<Group>
  ) { }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  renderer(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.refreshData();
      this.dtTrigger.next();
    });
  }

  refreshData() {
    this.genericService.getAll('group')
        .subscribe(
          groups => {
            this.groups = groups;
          },
          errors => {
            console.log(errors.message);
          }
        );
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getCurrentUser();
    this.addUpdateForm = this.formBuilder.group({
      id: [''],
      groupname: ['', [Validators.required]]
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      pageLength: 10
    };
    this.refreshData();
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onSubmit() {
    if (this.addUpdateForm.invalid) {
      return;
    }
    if(!this.isUpdate) {
      let group = new Group(
        0, 
        this.genericService.getDateNow(), 
        null, 
        this.currentUser.User.person.firstname + ' ' + this.currentUser.User.person.lastname, 
        null, 
        this.f.groupname.value);
      this.genericService.Add('group', group);
      this.renderer();
    }
    else {
      let group = this.groups[this.indexGroupArray];
      group.groupname = this.f.groupname.value;
      group.updatedate = this.genericService.getDateNow();
      group.updatedby = this.currentUser.User.person.firstname + ' ' + this.currentUser.User.person.lastname;
      this.genericService.Update('group', group);
      this.renderer();
    }
    this.resetForm();
  }

  resetForm() {
    this.isUpdate = false;
    this.titleForm = 'Add Group';
    this.indexGroupArray = -1;
    this.addUpdateForm.reset();
  }

  setIndex(index: any) {
    this.isUpdate = true;
    this.titleForm = 'Update Group';
    this.indexGroupArray = index;
    this.f.groupname.setValue(this.groups[this.indexGroupArray].groupname);
  }

  delete() {
    this.genericService.Delete('group', this.groups[this.indexGroupArray].id);
    this.groups.splice(this.indexGroupArray, 1);
    this.resetForm();
    $('#deleteModal').modal('hide');
  }
}
