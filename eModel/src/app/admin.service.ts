import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private ht: HttpClient) { }

  logintype="user";
  loginid="1";

  urls={
    "userdata":"http://localhost:3000/user_details/",
    "carddata":"http://localhost:3000/card_details/",
    "containertypedata":"http://localhost:3000/containertype_details/",
    "terminaldata":"http://localhost:3000/terminal_details/",
    "containerdata":"http://localhost:3000/container_details/",
    "appointmentdata":"http://localhost:3000/appointment_details/",
    "paymentdata":"http://localhost:3000/payment_details/",
    "statusdata":"http://localhost:3000/status_details/",
    "feedbackdata":"http://localhost:3000/feedback_details/"
  }

  getUserData()
  {
    return this.ht.get(this.urls.userdata);
  }
  putUserData(data:any) {
    return this.ht.put(this.urls.userdata+data.id, data);
  }


  getPaymentData()
  {
    return this.ht.get(this.urls.paymentdata);
  }
  getAppointmentData()
  {
    return this.ht.get(this.urls.appointmentdata);
  }

  getFeedbackData()
  {
    return this.ht.get(this.urls.feedbackdata);
  }
  putFeedbackData(data:any)
  {
    return this.ht.put(this.urls.feedbackdata+data.id, data);
  }

  getterminalData()
  {
    return this.ht.get(this.urls.terminaldata);
  }
  postTerminalData(data:any)
  {
    return this.ht.post(this.urls.terminaldata, data);
  }
  putTerminalsData(data:any) {
    return this.ht.put(this.urls.terminaldata+data.id, data);
  }

}
