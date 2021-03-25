import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenericService } from 'src/app/business/services/generic.service';
import { Group } from 'src/app/infrastructure/models/group.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy {
  
  titlePage: string = 'Groups Management';
  titleTable: string = 'Groups List';
  groups: Group[];
  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  // For more information please visit the package github : https://l-lin.github.io/angular-datatables/#/welcome
  dtTrigger: Subject<Group> = new Subject<Group>();

  constructor(
    private genericService: GenericService<Group>
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.genericService.getAll('group')
        .subscribe(
          groups => {
            this.groups = groups;
            this.dtTrigger.next();
          },
          errors => {
            console.log(errors.message);
          }
        );
      },
      columns: [{ data: 'groupname' }]
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
