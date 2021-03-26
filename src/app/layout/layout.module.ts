import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from '../components/guarded-components/home/home.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../shared/components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GroupsComponent } from '../components/guarded-components/groups/groups.component';
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../business/services/authentication.service';
import { GenericService } from '../business/services/generic.service';
import { JwtInterceptor } from '../interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



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
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthenticationService,
    GenericService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
})
export class LayoutModule { }
