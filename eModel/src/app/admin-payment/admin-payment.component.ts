import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.css']
})
export class AdminPaymentComponent implements OnInit {


  receiveuserdetails: any;
  receivepaymentdetails: any;
  receiveappointmentdetails: any;
  constructor(public ht: AdminService, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.ht.getAppointmentData().subscribe((appointment_details) => this.show(appointment_details));
    this.ht.getPaymentData().subscribe((payment_details) => this.showdata(payment_details))
  }
showdata(data:any)
{
  this.receivepaymentdetails = data;

}
  show(appointment_details: any) 
  {

    this.receiveappointmentdetails = appointment_details;
  }
  

}
