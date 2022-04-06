import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  formIsNew = false;
  receiveuserdetails: any;
  constructor(public ht: AdminService, private modalService: NgbModal, private fb: FormBuilder) { }
  ngOnInit() {
    this.ht.getUserData().subscribe((user_details) => this.show(user_details));
  }

  MakeStatus(data:any) {
    if(data.user_status == true)
    {
      data.user_status = false;
    }
    else
    {
      data.user_status = true;
    }
    this.ht.putUserData(data).subscribe((data) => console.log(data));
    this.modalService.dismissAll()
  }
  show(user_details: any) {

    this.receiveuserdetails = user_details;
  }
  
}
