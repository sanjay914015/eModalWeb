import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { regExpEscape, toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-userrequest',
  templateUrl: './userrequest.component.html',
  styleUrls: ['./userrequest.component.css']
})
export class UserrequestComponent implements OnInit {

  //Loader
  showLoadingIndicator = true;
  showbtn = true;

  closeResult = '';
  constructor(private getDataRequest: UserDataService, private fB: FormBuilder, private modalService: NgbModal) { }
  recRequestData: any;
  approvedDetails: any;
  rejectDetails: any;
  tempCost = 0;
  tempData: any
  tempDataReject: any
  tempId: any
  tempDate: any
  tempApproveIdStorage: any = []
  trequests: any = [];
  terminalcode: any;

  //Approve,Reject Modal
  approveRequest(content: any, requestData: any, id: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.tempData = requestData;
    this.tempId = id;
  }
  //No Need for Other Modal Opener
  rejectRequest(content: any, requestData: any, id: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.tempDataReject = requestData;
    this.tempId = id;
  }

  approveFromModal(approvedDetails: any) {

    //Ashish 
    this.tempCost = parseFloat(approvedDetails.value.requestCost);
    this.tempData.cost = this.tempCost;
    this.tempData.appointment_status = "Approved";
    this.tempData.terminal_remarks = approvedDetails.value.terminalRemarks;
    this.tempData.delivery_date = approvedDetails.value.deliveryDate;
    this.getDataRequest.getappointmentDataById(this.tempId).subscribe((data: any) => {
      data.cost = this.tempData.cost;
      data.appointment_status = this.tempData.appointment_status;
      data.terminal_remarks = this.tempData.terminal_remarks;
      data.delivery_date = this.tempData.delivery_date;
      data.request_response_date = Date();
      // console.log(data);
      this.getDataRequest.putappointmentdata(data, this.tempId).subscribe((appointmentdata: any) => {
        this.getDataRequest.postNewNotification(appointmentdata.user_id, `Request For Container: ${appointmentdata.container_id} Has Been ${appointmentdata.appointment_status}`);
      });
    });
    // this.approvedDetails.reset();
    // console.log(this.tempId);
    this.modalService.dismissAll();
  }

  rejectRemarksFromModal(rejectDetails: any) {
    this.tempData.terminal_remarks = rejectDetails.value.terminalRemarks;
    this.getDataRequest.getappointmentDataById(this.tempId).subscribe((data: any) => {
      data.appointment_status = "Rejected";
      data.terminal_remarks = this.tempData.terminal_remarks;
      data.request_response_date = Date();
      // console.log(data);
      this.getDataRequest.putappointmentdata(data, this.tempId).subscribe((appointmentdata: any) => {
        this.getDataRequest.postNewNotification(appointmentdata.user_id, `Request For Container: ${appointmentdata.container_id} Has Been ${appointmentdata.appointment_status}`);
      });
    });
    this.modalService.dismissAll();
    // this.tempDataReject.terminal_remarks = rejectDetails.value.terminalRemarks;
    // this.getDataRequest.putappointmentdata(this.tempDataReject, this.tempId).subscribe();
    // this.rejectDetails.reset();
    this.ngOnInit();
  }

  onChangeCheckbox($event: any) {
    // for (let i = 0; i < this.recRequestData.length; i++) {
    //   this.recRequestData[i].selected = !this.recRequestData[i].selected
    //   this.recRequestData[i].selectedAll = !this.recRequestData[i].selectedAll
    // }

    // for (let i = 0; i < this.recRequestData.length; i++) {
    //   if (this.recRequestData[i].id == parseInt($event.target.value)) {
    //     this.recRequestData[i].selected = !$event.target.checked
    //   }
    // }

    const id = $event.target.value;
    const isChecked = $event.target.checked;
    if (isChecked) {
      this.tempApproveIdStorage.push(parseInt(id))
    } else {
      this.tempApproveIdStorage.pop(parseInt(id))
    }
    // console.log(this.tempApproveIdStorage);
  }

  approveFromModalSelected(approvedDetails: any) {
    this.tempCost = parseFloat(approvedDetails.value.requestCost)
    this.tempDate = approvedDetails.value.deliveryDate
    for (let i = 0; i < this.recRequestData.length; i++) {
      if (this.tempApproveIdStorage.includes(this.recRequestData[i].id)) {
        this.tempData = this.recRequestData[i]
        this.tempData.cost = this.tempCost
        this.tempData.appointment_status = "approved"
        this.tempData.deliveryDate = this.tempDate
        this.tempData.terminal_remarks = ""
        // console.log(this.tempData)
        this.getDataRequest.putappointmentdata(this.tempData, this.recRequestData[i].id).subscribe((data: any) => {
        });
      }
    }
    this.approvedDetails.reset();
    this.tempApproveIdStorage = []
  }

  selectAll() {
    if (this.recRequestData[0].selectedAll == false) {
      for (let i = 0; i < this.recRequestData.length; i++) {
        this.tempApproveIdStorage.push(this.recRequestData[i].id)
        this.recRequestData[i].selected = true
        this.recRequestData[i].selectedAll = true
      }
    } else if (this.recRequestData[0].selectedAll == true) {
      this.tempApproveIdStorage = []
      for (let i = 0; i < this.recRequestData.length; i++) {
        this.recRequestData[i].selected = false
        this.recRequestData[i].selectedAll = false
      }
    }
    console.log(this.tempApproveIdStorage);
  }

  ngOnInit(): void {
    //Loader
    setTimeout(() => {
      this.showLoadingIndicator = false;
    }, 2000);
    this.getDataRequest.getappointmentdata().subscribe((data) => {
      this.recRequestData = data;
      this.getDataRequest.getterminalDataById(this.getDataRequest.loginid).subscribe((data) => {
        this.terminalcode = data;
        for (let i = 0; i < this.recRequestData.length; i++) {
          if (this.recRequestData[i].source_terminal_id == this.terminalcode.terminal_id) {
            // this.trequests.push(this.recRequestData[i]);
            this.getDataRequest.getTerminalDataById(this.recRequestData[i].delivery_terminal_id).subscribe((data: any) => {
              this.trequests.push({ ...this.recRequestData[i], "destination": data[0].terminal_name + ', ' + data[0].city, "selected": false, "selectedAll": false });
            });
          }
        }
        // for (let i = 0; i < this.trequests.length; i++) {
        //   this.getDataRequest.getTerminalDataById(this.trequests[i].delivery_terminal_id).subscribe((data:any)=>{
        //     this.trequests[i]={...this.trequests[i],"destination":data[0].terminal_name+', '+data[0].city, "selected": false, "selectedAll": false};
        //   });
        // }
        // console.log(this.trequests);
      });
      // let num = 0;
      // for (let i = 0; i < this.recRequestData.length; i++) {
      //   this.recRequestData[i] = { ...this.recRequestData[i], "selected": false, "selectedAll": false }
      // }
      // console.log(this.recRequestData);
      // this.recRequestData.forEach((element: any) => {
      //   let id = element.delivery_terminal_id
      //   let stringData = `?terminal_id=${id}`
      //   this.getDataRequest.getterminalDataById(stringData).subscribe((data: any) => {
      //     this.recRequestData[num] = { ...this.recRequestData[num], "destination": data[0].city };
      //     num++;
      //   });
      // });
    });

    this.approvedDetails = this.fB.group({
      "requestCost": ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      "deliveryDate": ["", [Validators.required]],
      "terminalRemarks": [""]
    });

    this.rejectDetails = this.fB.group({
      "terminalRemarks": ["", [Validators.required]]
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
