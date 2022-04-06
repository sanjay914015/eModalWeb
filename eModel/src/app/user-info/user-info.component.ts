import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private usrds:UserDataService) { }
  
  logintype=true;
  profileimg:any;
  userdata:any;
  fname:any;
  lname:any;
  contact:any;
  email:any;
  password:any;
  currpasswd:any;
  newpasswd:any;
  cnfmpasswd:any;

  ngOnInit(): void {
    console.log(this.usrds.logintype);
    
    if(this.usrds.logintype=="user"){
      this.usrds.getUserDataById(this.usrds.loginid).subscribe((data)=>this.showData(data));
    }
    else if(this.usrds.logintype=="terminal"){
      this.logintype=false;
      this.usrds.getterminalDataById(this.usrds.loginid).subscribe((data)=>this.showData(data));
    }
  }

  showData(data:any){
    console.log(data);
    this.userdata=data;
    if(this.usrds.logintype=="user"){
      this.profileimg=this.userdata.user_profilephoto;
      this.fname=this.userdata.user_firstname;
      this.lname=this.userdata.user_lastname;
      this.contact=this.userdata.user_contact;
      this.email=this.userdata.user_email;
      this.password=this.userdata.user_password;
    }
    else if(this.usrds.logintype=="terminal"){
      this.profileimg=this.userdata.terminal_logo;
      this.fname=this.userdata.terminal_name;
      this.contact=this.userdata.terminal_mobile;
      this.email=this.userdata.terminal_email;
      this.password=this.userdata.terminal_password;
    }
  }
  logintoggleButton:boolean=true;
  public toggleButton: boolean = true;
  enable() {
    this.toggleButton = false;
  }

  disable() {
    if(this.usrds.logintype=="user"){
      this.userdata.user_firstname=this.fname;
      this.userdata.user_lastname=this.lname;
      this.userdata.user_contact=this.contact;
      this.usrds.putUserData(this.userdata,this.userdata.id).subscribe();
    }
    else if(this.usrds.logintype=="terminal"){
      this.userdata.terminal_name=this.fname;
      this.userdata.terminal_mobile=this.contact;
      this.usrds.putTerminalData(this.userdata,this.userdata.id).subscribe();
    }
    this.toggleButton = true;
  }

  loginenable(){
    this.logintoggleButton=false;
  }
  logindisable(){
    if(this.password==this.currpasswd){
      if(this.newpasswd==this.cnfmpasswd)
      {
        this.userdata.user_password=this.newpasswd;
        if(this.usrds.logintype=="user"){
          this.usrds.putUserData(this.userdata,this.userdata.id).subscribe();
        }
        else if(this.usrds.logintype=="terminal"){
          this.usrds.putTerminalData(this.userdata,this.userdata.id).subscribe();
        }
      }
    }
    this.logintoggleButton=true;
  }
}