import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  successMessage: String = '';
  constructor(private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {
    console.log(this.loginForm.value);

    var data = {

      "user":{
        "username": this.loginForm.value.username,
        "password": this.loginForm.value.password,
      }
}

    if (this.loginForm.valid) {
      this._myservice.login(data)
        .subscribe(
          data => {
           
           var token = this._myservice.get(data,"user.token");
           console.log(token);
            localStorage.setItem('token', token.toString()),
            this.successMessage = "login Success"

            this._router.navigate(['/dash']);
          },
          error => { 
            var error = this. _myservice.get(error,'error.message')
            this.successMessage = error;
          }
        );
    }
  }
  
  movetoregister() {
    this._router.navigate(['../register'], { relativeTo: this._activatedRoute });
  }
}
