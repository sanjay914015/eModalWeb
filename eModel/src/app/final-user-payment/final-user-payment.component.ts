import { Component, OnInit } from '@angular/core';
import { UpdatedateDirective } from '../updatedate.directive';
import { WatchlistService } from '../watchlist.service';
import { FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-final-user-payment',
  templateUrl: './final-user-payment.component.html',
  styleUrls: ['./final-user-payment.component.css']
})
export class FinalUserPaymentComponent implements OnInit {
  payment: any;

  constructor(public dt: WatchlistService, public formBuilder: FormBuilder,
    private getAppointmentData: BookingService, private router: Router, private usrds: UserDataService) {
    this.payment = this.formBuilder.group({
      name: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      cardNumber: ['', [Validators.required, Validators.minLength(15), Validators.pattern(/^4[0-9]{12}(?:[0-9]{3})?$/)]]
    });
  }

  containers: any;
  myForm: any;
  paymentdata: any;
  totalPrice = 0;
  todaydate = "";
  statusdata: any;

  addContainer(data: any) {
    this.usrds.getPaymentData().subscribe((pdata: any) => {
      this.paymentdata = {
        "id": 4000 + pdata.length,
        "payment_amount": this.totalPrice,
        "issued_by": "eModal",
        "container_id": this.containers.container_id,
        "date": Date()
      };
      this.usrds.postPaymentData(this.paymentdata).subscribe();
      this.usrds.getappointmentDataById(this.containers[0].id).subscribe((apointmentdata: any) => {
        //  console.log(apointmentdata);
        apointmentdata.payment_id = this.paymentdata.id;
        apointmentdata.payment_date = this.paymentdata.date;
        this.usrds.putappointmentdata(apointmentdata, apointmentdata.id).subscribe((appointmentdata: any) => {
          this.usrds.postNewNotification(appointmentdata.source_terminal_id, `Payment Has Been made for Container: ${this.containers[0].container_id}`);
          console.log(appointmentdata.source_terminal_id);          
          this.getAppointmentData.getContainerDataByContainerId(appointmentdata.container_id).subscribe((containerdata: any) => {
            containerdata[0].status = "Booked";
            this.getAppointmentData.putContainerData(containerdata[0], containerdata[0].id).subscribe();
          });
        });
        this.usrds.getStatusData().subscribe((statusdt: any) => {
          this.statusdata = {
            "status_id": "ST" + (10000 + statusdt.length),
            "appointment_id": apointmentdata.appointment_id,
            "con_id": apointmentdata.container_id,
            "con_loaded": false,
            "container_status": "",
            "destination": "",
            "departure_date": "",
            "ship_id": "",
            "arriving_date": "",
            "receiver_delivery_date": ""
          };
          this.usrds.postStatusData(this.statusdata).subscribe();
        });
      });
    });
    // this.router.navigate(['/InitialLanding/', 'bookings']);
  }


  ngOnInit(): void {
    if (this.getAppointmentData.paymentdata == "") {
      this.router.navigate(['/InitialLanding/', 'bookings']);
    }
    this.containers = this.getAppointmentData.paymentdata;
    console.log(this.containers);
    this.todaydate = Date();
    for (let i = 0; i < this.containers.length; i++) {
      this.totalPrice += parseInt(this.containers[i].cost);
    }
    // this.dt.getData().subscribe((data: any) => this.addContainer(data));
    //this.dt.getData().subscribe((data) => console.log(data));
  }
  message() {
    // alert("");
  }
}
