import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private ds:UserDataService, public fb:FormBuilder, public router:Router) { }
  
  userInfo:any;
  userFormData:any;
  submitted=false;


  ngOnInit(): void {

    this.ds.getUserData().subscribe((data) => this.fatchUserData(data));


    this.userFormData = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  fatchUserData(data:any)
  {
     this.userInfo=data;
     console.log(this.userInfo);
  }

  get f() { return this.userFormData.controls; }


  AuthCheck()
   {
      
    this.submitted = true;
    if (this.userFormData.invalid) {
      return;
  }

    console.log(this.userFormData.value.username);
      console.log(this.userFormData.value.password);
      console.log(this.userInfo[0].user_username);
      if(this.userFormData.value.username==this.userInfo[0].user_username && this.userFormData.value.email==this.userInfo[0].user_password)
      {
          //this.flag=true;
          console.log(this.userFormData.value.username);
          this.router.navigateByUrl('/InitialLanding');
      }
   }

  logopath="../assets/images/logos/logo.png";

}
