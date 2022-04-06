import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  receiver() {
    throw new Error('Method not implemented.');
  }

  constructor(private ht: HttpClient) { }

  logintype = "user";
  loginid = "10003";
  logintid="";
  user: any;
  requests:any;

  urls={
    "userdata":"http://localhost:3000/user_details/",
    "carddata":"http://localhost:3000/card_details/",
    "containertypedata":"http://localhost:3000/containertype_details/",
    "terminaldata":"http://localhost:3000/terminal_details",
    "containerdata":"http://localhost:3000/container_details",
    "appointmentdata":"http://localhost:3000/appointment_details",
    "paymentdata":"http://localhost:3000/payment_details/",
    "statusdata":"http://localhost:3000/status_details",
    "feedbackdata":"http://localhost:3000/feedback_details/",
    "terminal_details":"http://localhost:3000/terminal_details/",
    "admindata":"http://localhost:3000/admin_master/",
    "notifications":"http://localhost:3000/notification_details/"
  }

  getUserData() { return this.ht.get(this.urls.userdata); }
  getUserDataById(data: any) { return this.ht.get(this.urls.userdata+ data); }
  postUserData(data: any) { return this.ht.post(this.urls.userdata, data); }
  
  getterminalData() { return this.ht.get(this.urls.terminaldata); }
  getterminalDataById(data: any) { return this.ht.get(this.urls.terminaldata+'/'+data); }
  getTerminalDataById(data:any){ 
    return this.ht.get(this.urls.terminaldata+'/?terminal_id='+data); 
  }
  getappointmentdata() { return this.ht.get(this.urls.appointmentdata); }
  getappointmentDataById(data:any) { return this.ht.get(this.urls.appointmentdata+'/'+data); }
  putappointmentdata(data: any, id: any) { return this.ht.put(`${this.urls.appointmentdata}/${id}`, data); }
  getappointmentByTerminalId(id:any){
    return this.ht.get(`${this.urls.appointmentdata}/?source_terminal_id=${id}`);
  }

  putUserData(data: any, index: any) {
    return this.ht.put(this.urls.userdata+index, data);
  }
  putTerminalData(data:any,index:any){
    return this.ht.put(this.urls.terminaldata+index,data);
  }
  getadminData()
  {
    return this.ht.get(this.urls.admindata);
  }
  getadminDataById(data: any){
    return this.ht.get(this.urls.admindata + data);
  }
  getterminal(){
    return this.ht.get(this.urls.terminal_details);
  }

  getNotifications(data:any){
    return this.ht.get(this.urls.notifications+'?sendto_id='+data);
  }
  getNotificationsById(data:any){
    return this.ht.get(`${this.urls.notifications}?sendto_id=${data}`);
  }
  postNotification(data:any){
    return this.ht.post(this.urls.notifications, data);
  }

  getStatusData(){
    return this.ht.get(this.urls.statusdata);
  }
  getStatusDataByAppointmentId(data:any){
    return this.ht.get(`${this.urls.statusdata}?appointment_id=${data}`);
  }
  putStatusDataById(data:any,index:any){
    return this.ht.put(`${this.urls.statusdata}/${index}`,data);
  }
  postStatusData(data:any){
    return this.ht.post(this.urls.statusdata,data);
  }

  getPaymentData(){
    return this.ht.get(this.urls.paymentdata);
  }
  postPaymentData(data:any){
    return this.ht.post(this.urls.paymentdata,data);
  }

  postNewNotification(id:any,message:string) {
    let notification: any = {
      "sendto_id": id,
      "date": new Date(),
      "description": message,
      "status": false
    }
    this.postNotification(notification).subscribe();
  }
}
