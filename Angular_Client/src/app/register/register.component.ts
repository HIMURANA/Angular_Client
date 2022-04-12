import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  successMessage: String = '';
 
  
  constructor(private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    this.myForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null,Validators.required),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

   
  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }



  register() {
    console.log(this.myForm.value);
   
    
    var data = {

          "user":{
            "firstname": this.myForm.value.firstname,
            "lastname":this.myForm.value.lastname,
            "username": this.myForm.value.username,
            "password": this.myForm.value.password,
          }
    }
    console.log(data);
    if (this.myForm.valid) {
      this._myservice.submitRegister(data)
        .subscribe(
          data => {
            this.successMessage = 'Registration Success',
            this._router.navigate(['/main/login'])

          },
          error => {

            var r = this._myservice.get(error,"error.message");
            console.log(r);
            console.log(error);
            this.successMessage = r
          }
          
        );
    }
  }

  movetologin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }
}
