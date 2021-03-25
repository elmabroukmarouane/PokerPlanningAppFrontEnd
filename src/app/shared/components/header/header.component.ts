import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/business/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: any;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void { 
    this.currentUser = this.authenticationService.getCurrentUser();
  }

}
