import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-terminal',
  templateUrl: './admin-terminal.component.html',
  styleUrls: ['./admin-terminal.component.css']
})
export class AdminTerminalComponent implements OnInit {

  updatedFormData: any;
  formIsNew = false;
  receiveterminaldetails: any;
  constructor(public ht: AdminService, private modalService: NgbModal, private fb: FormBuilder) { }
  myForm: any;
  emptyForm = {
    "id": "",
    "terminal_id": "",
    "terminal_name": "",
    "terminal_mobile": "",
    "terminal_email": "",
    "terminal_password": "",
    "terminal_username": "",
    "terminal_location": "",
    "city": "",
    "country": "",
    "zipcode": "",
    "fax": "",
    "description": "",
    "terminal_status": "",
    "token": "",
  }
  ngOnInit() {
    this.ht.getterminalData().subscribe((terminal_details) => this.show(terminal_details));

    this.myForm = this.fb.group({
      id: ['', Validators.required],
      terminal_id: ['', Validators.required],
      terminal_name: ['', Validators.required],
      terminal_mobile: ['', Validators.required],
      terminal_email: ['', Validators.required],
      terminal_username: ['', Validators.required],
      terminal_password: ['', Validators.required],
      terminal_location: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zipcode: ['', Validators.required],
      terminal_status: ['', Validators.required]
    });
  }

  TerminalData() {
    console.log(this.myForm.value);
    this.updatedFormData = {
      "id": this.myForm.value.id,
      "terminal_id": this.myForm.value.terminal_id,
      "terminal_name": this.myForm.value.terminal_name,
      "terminal_mobile": this.myForm.value.terminal_mobile,
      "terminal_email": this.myForm.value.terminal_email,
      "terminal_username": this.myForm.value.terminal_username,
      "terminal_password": this.myForm.value.terminal_password,
      "terminal_location": this.myForm.value.terminal_location,
      "city": this.myForm.value.city,
      "country": this.myForm.value.country,
      "zipcode": this.myForm.value.zipcode,
      "terminal_status": this.myForm.value.terminal_status

    }

    console.log(this.updatedFormData);

    this.ht.putTerminalsData(this.updatedFormData).subscribe((data) => console.log(data));
  }


  postTermminalData() {
    console.log(this.myForm.value);
    this.updatedFormData = {
      "id": this.myForm.value.id,
      "terminal_id": this.myForm.value.terminal_id,
      "terminal_name": this.myForm.value.terminal_name,
      "terminal_mobile": this.myForm.value.terminal_mobile,
      "terminal_email": this.myForm.value.terminal_email,
      "terminal_username": this.myForm.value.terminal_username,
      "terminal_password": this.myForm.value.terminal_password,
      "terminal_location": this.myForm.value.terminal_location,
      "city": this.myForm.value.city,
      "country": this.myForm.value.country,
      "zipcode": this.myForm.value.zipcode,
      "terminal_status": this.myForm.value.terminal_status
    }
    console.log(this.updatedFormData);
    this.ht.postTerminalData(this.updatedFormData).subscribe((data) => console.log(data));
  }

  objectToFormData(objData: any) {
    this.myForm.setValue({
      id: objData.id,
      terminal_id: objData.terminal_id,
      terminal_name: objData.terminal_name,
      terminal_mobile: objData.terminal_mobile,
      terminal_email: objData.terminal_email,
      terminal_username: objData.terminal_username,
      terminal_password: objData.terminal_password,
      terminal_location: objData.terminal_location,
      city: objData.city,
      country: objData.country,
      zipcode: objData.zipcode,
      terminal_status: objData.terminal_status
    });
  }

  closeResult = '';
  open(content: any, data: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });

    console.log(data)
    if (data) {
      this.formIsNew = false;
      this.objectToFormData(data);
    }
    else {
      this.formIsNew = true;
      this.objectToFormData(this.emptyForm);
    }

  }
  show(terminal_details: any) {
    this.receiveterminaldetails = terminal_details;
  }
}
