import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/guarded-components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { GroupsComponent } from './components/guarded-components/groups/groups.component';



const routes: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'layout', component: LayoutComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'groups', component: GroupsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
