import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../business/services/authentication.service';
import { GenericService } from '../../../business/services/generic.service';
import { Person } from '../../../infrastructure/models/person.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;
  persons: Person[];
  titlePage: string = 'Dashboard';

  constructor(
    private authenticationService: AuthenticationService,
    private genericService: GenericService<Person>
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getCurrentUser();
    this.genericService.getAll('person')
      .subscribe(
        persons => {
          this.persons = persons;
        },
        errors => {
          console.log(errors.message);
        }
      );
  }

}
