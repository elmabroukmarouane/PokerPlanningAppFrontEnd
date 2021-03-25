import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faExclamationCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../business/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  faExclamationCircle = faExclamationCircle;
  faInfoCircle = faInfoCircle;
  yearNow: number = new Date().getFullYear();
  
  get f() { return this.loginForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.getToken()) { 
        this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
  }
  this.authenticationService.login(this.f.email.value, this.f.password.value)
      .subscribe(
          user => {
              this.error = '';
              this.success = user.Message;
              this.loginForm.reset();
              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 3000);
          },
          error => {
              this.success = '';
              this.error = error.error.Message;
              this.loginForm.reset();
          }
      );
  }

}
