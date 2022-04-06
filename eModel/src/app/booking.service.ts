import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  url = "http://localhost:3000/containertype_details";
  urlpayment = "http://localhost:3000/payment_details";

  paymentdata:any=[];
  constructor(private http: HttpClient) { }

  users() { return this.http.get(this.url); }
  payment() { return this.http.get(this.urlpayment); }

  getAppointmentDetails() { return this.http.get("http://localhost:3000/appointment_details") }
  postAppointmentDetails(data: any) { return this.http.post("http://localhost:3000/appointment_details", data) }
  getAppointmentDetailsByUserId(data:any){ return this.http.get("http://localhost:3000/appointment_details?user_id="+data)}

  getTerminalDetails() { return this.http.get("http://localhost:3000/terminal_details/") }
  getTerminalDetailsById(data: any) { return this.http.get("http://localhost:3000/terminal_details/" + data) }

  getContainerDetails() { return this.http.get("http://localhost:3000/containertype_details/") }
  getContainerDetailsById(data: any) { return this.http.get("http://localhost:3000/containertype_details/" + data) }
  getContainerDetailsByTerminalId(data:any){ return this.http.get("http://localhost:3000/container_details?terminal_id_origin=" + data);}
  getContainerDataByContainerId(data:any){
    return this.http.get("http://localhost:3000/container_details?con_id="+data);
  }
  putContainerData(data:any,id:any){
    return this.http.put("http://localhost:3000/container_details/"+id,data);
  }
  getContainerByConId(data:any){ return this.http.get("http://localhost:3000/container_details" + data);}
  getContypedataById(data:any){ return this.http.get("http://localhost:3000/containertype_details?contype_id=" + data)}
}
