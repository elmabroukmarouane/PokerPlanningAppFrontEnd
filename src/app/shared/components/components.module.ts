import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ModalLogoutComponent } from './modal-logout/modal-logout.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ScrollToTopComponent,
    ModalLogoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ScrollToTopComponent,
    ModalLogoutComponent
  ]
})
export class ComponentsModule { }
