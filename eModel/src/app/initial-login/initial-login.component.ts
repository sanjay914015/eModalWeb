import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-initial-login',
  templateUrl: './initial-login.component.html',
  styleUrls: ['./initial-login.component.css']
})
export class InitialLoginComponent implements OnInit {

  constructor(private ds: UserDataService, public fb: FormBuilder, public router: Router, private route: ActivatedRoute) { }
  //Get Data From Json Server
  userInfo: any;
  terminalInfo: any;
  adminInfo: any;

  //Get Form Data
  userFormData: any;

  logopath = "../assets/images/logos/logo.png";
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.store(params);
      // this.abc = params.admin;
      // console.log(this.abc);
    });

    if (this.ds.logintype != "") {      
      this.logintype = this.ds.logintype;
      this.userFormData = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });

      if (this.ds.logintype == "user") {
        this.ds.getUserData().subscribe((data) => this.userInfo = data);
      }
      else if(this.ds.logintype=="terminal"){
        this.ds.getterminalData().subscribe((data) => this.terminalInfo = data);
      }
      else if(this.ds.logintype == "admin"){
        this.ds.getadminData().subscribe((data) => this.adminInfo = data);
      }
    }
    else {
      this.router.navigate(['/', 'mainlogin']);
    }
  }

  store(data: any) {
    if (data.admin == "1424") {
      this.ds.logintype = "admin";
    }
  }

  submitted = false;
  alertmsg = false;
  flag = false;
  logintype: any;
  abc: string = "";

  get f() { return this.userFormData.controls; }

  AuthCheck() {
    this.submitted = true;
    if (this.userFormData.invalid) {
      return;
    }
    //USER
    if (this.ds.logintype == "user") {
      for (let i = 0; i < this.userInfo.length; i++) {
        if (this.userFormData.value.username == this.userInfo[i].user_username && this.userFormData.value.password == this.userInfo[i].user_password) {
          this.flag = true;
          this.ds.loginid = this.userInfo[i].id;
          // console.log(this.ds.loginid);
          this.router.navigateByUrl('/InitialLanding');
          break;
        }
      }
      if (this.flag == false) {
        this.alertmsg = true;
      }
    }
    //TERMINAL
    else if (this.ds.logintype == "terminal") {
      for (let i = 0; i < this.terminalInfo.length; i++) {
        if (this.userFormData.value.username == this.terminalInfo[i].terminal_username && this.userFormData.value.password == this.terminalInfo[i].terminal_password) {
          // console.log(this.userFormData.value.username);
          this.flag = true;
          this.ds.loginid = this.terminalInfo[i].id;
          this.ds.logintid = this.terminalInfo[i].terminal_id;
          // console.log(this.ds.logintid);
          
          this.router.navigateByUrl('/InitialLanding/userrequests');
          break;
        }
      }
      if (this.flag == false) {
        this.alertmsg = true;
      }
    }
    //ADMIN
    else if (this.ds.logintype == "admin") {
      // console.log(this.adminInfo);
      for (let i = 0; i < this.adminInfo.length; i++) {
        if (this.userFormData.value.username == this.adminInfo[i].admin_username && this.userFormData.value.password == this.adminInfo[i].admin_password) {
          // console.log(this.userFormData.value.username);
          this.flag = true;
          this.ds.loginid = this.adminInfo[i].id;
          this.router.navigateByUrl('/InitialLanding/admin-terminal');
          break;
        }
      }
      if (this.flag == false) {
        this.alertmsg = true;
      }
    }
  }

  closealert() {
    this.userFormData.reset({});
    this.alertmsg = false;
    this.submitted = false;
  }
}
