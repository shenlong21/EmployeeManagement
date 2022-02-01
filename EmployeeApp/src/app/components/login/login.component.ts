import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  // flag
  invalidCredentials: boolean = false;
  signinloadingFlag: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(3)]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
   }

  ngOnInit(): void {
  }

  onSubmit(formVal: FormGroup) {
    this.invalidCredentials = false;
    this.signinloadingFlag = true;
    console.log(formVal.value);
    let user: User = {
      username: formVal.value.username,
      password: formVal.value.password
    }

  
    this.loginService.authenticate(user).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        // console.log(error);
        // alert("Error occured during authentication!")
        this.signinloadingFlag = false;
        this.invalidCredentials = true;
      },
      complete: () => {
        this.signinloadingFlag = false;
      }
    });


  }

}
