import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from '../components/guarded-components/home/home.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../shared/components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GroupsComponent } from '../components/guarded-components/groups/groups.component';
import { DataTablesModule } from "angular-datatables";



@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    GroupsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    FontAwesomeModule,
    DataTablesModule
  ]
})
export class LayoutModule { }
