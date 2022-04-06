import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../booking.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  //Loader
  showLoadingIndicator = false;

  statusdata:any=[];
  statusprint:any=[];
  date:string="";

  constructor(private usrds: UserDataService, private fb: FormBuilder, private modalService: NgbModal,
    private getAppointmentData: BookingService) { }

  ngOnInit(): void {
    //Loader
    setTimeout(() => {
      this.showLoadingIndicator = false;
    }, 2000);

    this.usrds.getterminalDataById(this.usrds.loginid).subscribe((terminaldata:any)=>{
      this.usrds.getappointmentByTerminalId(terminaldata.terminal_id).subscribe((appointmentdata:any)=>{
        for(let i=0;i<appointmentdata.length;i++){
          if(appointmentdata[i].payment_id!=""){
            this.usrds.getStatusDataByAppointmentId(appointmentdata[i].appointment_id).subscribe((data:any)=>{
              for(let j=0;j<data.length;j++)
              {
                if(data[j].appointment_id==appointmentdata[i].appointment_id){
                  this.statusdata.push(data[j]);
                  let dt = new Date(appointmentdata[i].request_response_date).toLocaleDateString();
                  this.statusprint.push({...data[j],"paymentId":appointmentdata[i].payment_id,"approveDate":dt,"receiverdata":[appointmentdata[i].receiver_fullname,appointmentdata[i].receiver_phone,appointmentdata[i].receiver_mail]})
                  // console.log(this.statusprint);
                  // console.log(this.statusdata);
                  
                }               
              }
            });          
          } 
        }      
      });
    });

    this.updatestatusForm=this.fb.group({
      "con_data":"",
      "con_date":"",
      "con_time":"",
      "dept_date":"",
      "dept_time":"",
      "ship_data":"",
      "ship_date":"",
      "ship_time":"",
      "dest_date":"",
      "dest_time":"",
      "del_date":"",
      "del_time":""
    });
  }

  modaltype="";
  statusid="";
  open(content: any,index:any,type:string) {
    this.modaltype=type;
    this.modalService.open(content);
    this.statusid=index;
  }

  updatestatusForm:any;
  update(data:any){
    if(this.modaltype=="Container"){
      this.statusdata[this.statusid].con_loaded=(data.value.con_data=="Loaded")?true:false;
      this.statusdata[this.statusid].con_loaded_date=data.value.con_date+" "+data.value.con_time;
      this.statusprint[this.statusid].con_loaded=this.statusdata[this.statusid].con_loaded;
      this.statusprint[this.statusid].con_loaded_date=this.statusdata[this.statusid].con_loaded_date;
    }
    else if(this.modaltype=="Departure"){
      this.statusdata[this.statusid].departure_date=data.value.dept_date+" "+data.value.dept_time;
      this.statusprint[this.statusid].departure_date=this.statusdata[this.statusid].departure_date;
    }
    else if(this.modaltype=="Ship ID"){
      this.statusdata[this.statusid].ship_id=data.value.ship_data;
      this.statusdata[this.statusid].ship_date=data.value.ship_date+" "+data.value.ship_time;     
      this.statusprint[this.statusid].ship_id=this.statusdata[this.statusid].ship_id;
      this.statusprint[this.statusid].ship_date=this.statusdata[this.statusid].ship_date;
    }
    else if(this.modaltype=="Reach Date"){
      this.statusdata[this.statusid].arriving_date=data.value.dest_date+" "+data.value.dest_time;
      this.statusprint[this.statusid].arriving_date=this.statusdata[this.statusid].arriving_date;
    }
    else if(this.modaltype=="Delivered"){
      this.statusdata[this.statusid].receiver_delivery_date=data.value.del_date+" "+data.value.del_time;
      this.statusprint[this.statusid].receiver_delivery_date=this.statusdata[this.statusid].receiver_delivery_date;
      this.usrds.postNewNotification(this.usrds,`Continer ${this.statusprint[this.statusid].con_id} Has Been Delivred! `);
      this.getAppointmentData.getContainerDataByContainerId(this.statusprint[this.statusid].con_id).subscribe((containerdata:any)=>{
        containerdata[0].status="Booked";
        this.getAppointmentData.putContainerData(containerdata[0],containerdata[0].id).subscribe();
      });
    }
    this.usrds.putStatusDataById(this.statusdata[this.statusid],this.statusdata[this.statusid].id).subscribe();
    this.modalService.dismissAll();
  }
}
