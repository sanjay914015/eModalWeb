import { WatchlistService } from '../watchlist.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserDataService } from '../user-data.service';

import { HttpClient } from '@angular/common/http';

declare var jsPDF: any;
@Component({
  selector: 'app-container-watchlist',
  templateUrl: './container-watchlist.component.html',
  styleUrls: ['./container-watchlist.component.css']
})
export class ContainerWatchlistComponent implements OnInit {
  public isCollapsed = false;
  closeResult = '';

  constructor(private wS: WatchlistService,
    private modalService: NgbModal,
    private http: HttpClient,
    private usrds: UserDataService) { }

  watchlist: any[] = [];
  containerIds = "";

  changeState(i: any) {
    this.watchlist[i].isChecked = !this.watchlist[i].isChecked;
  }

  deletwSelectedRows() {
    for (let i = 0; i < this.watchlist.length; i++) {
      if (this.watchlist[i].isChecked) {
        // this.wS.delete(this.watchlist[i].id).subscribe();
        // console.log(this.watchlist[i].con_id);
        // console.log(this.usrds.user);
        this.removeat(this.watchlist[i].con_id);
        // this.usrds.user.user_watchlist.pop(this.watchlist[i].con_id);
        // console.log(this.usrds.user);
        this.usrds.putUserData(this.usrds.user, this.usrds.user.id).subscribe();
        this.watchlist.splice(i, 1);
      }
    }
  }

  removeat(element: string) {
    // console.log(element);
    this.usrds.user.user_watchlist.forEach((value: any, index: any) => {
      if (value == element) this.usrds.user.user_watchlist.splice(index, 1);
    });
  }

  wlids: any;
  wldata: any;
  updateUser(data: any) {
    this.usrds.user = data;
    this.wlids = this.usrds.user.user_watchlist;
    this.wS.getContainerWatchlist().subscribe((dt) => this.saveToWatchlist(dt));
  }
  saveToWatchlist(data: any) {
    this.wldata = data;
    let j = 0;
    while (j < this.wlids.length) {
      for (let i = 0; i < this.wldata.length; i++) {
        if (this.wldata[i].con_id == this.wlids[j]) {
          this.watchlist.push(this.wldata[i]);
          // console.log(this.wldata[i]);
          j++;
          continue;
        }
      }
    }
    this.watchlist = this.watchlist.map((v: any) => ({ ...v, loadRow: false, isChecked: false }));
    // data = data.map((v: any) => ({ ...v, loadRow: false, isChecked: false }));
    // this.watchlist = data;
    // console.log(this.watchlist);
  }
  ngOnInit(): void {
    // this.usrds.getUserDataById(this.usrds.loginid).subscribe((data)=>{
    // this.wldata=data;
    // console.log(this.wldata.user_watchlist);
    // });
    this.usrds.getUserDataById(this.usrds.loginid).subscribe((data) => this.updateUser(data));
  }

  expand(index: any) {
    this.watchlist[index].loadRow = true;
  }

  collapse(index: any) {
    this.watchlist[index].loadRow = false;
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  value: any;

  updateWatchList(data: any, conid: any) {
    if (data != []) {
      this.watchlist.push(data[0]);
      console.log(data);
    }
  }

  isPresent(item: any, data: any) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] == item) {
        return true;
      }
    }
    return false;
  }

  watchPresent(item: any, data: any) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].con_id == item) {
        return true;
      }
    }
    return false;
  }

  addContainer(conid: any) {
    // console.log(this.containerIds);
    if (conid != '') {
      // console.log(conid);
      // console.log(this.usrds.user.user_watchlist);
      if (this.watchPresent(conid, this.wldata)) {
        if (!this.isPresent(conid, this.usrds.user.user_watchlist)) {
          this.usrds.user.user_watchlist.push(conid);
          this.usrds.putUserData(this.usrds.user, this.usrds.user.id).subscribe((data) => console.log(data));
          this.wS.getContainerById(conid).subscribe((data) => this.updateWatchList(data, conid));
        }
      }
    }
    this.modalService.dismissAll();
    // this.wS.getConid(conid).subscribe((saveToWatchlist) => {this.value=saveToWatchlist})
    // console.log(this.value);
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

  // download() {
  //   var element = document.getElementById('contentToConvert');
  //   html2canvas(element).then((canvas) => {
  //     console.log(canvas)
  //     var imgData =canvas.toDataURL('image/png')
  //     var doc = new jsPDF()
  //     var imgHeight =canvas.height * 208 /canvas .width;
  //     doc.addImage(imgData,0,0,208,imgHeight)
  //     doc.save("image.pdf")

  //   });

}
//   recData: any

//   "container_watch_list" = {
//     "contype_id": "",
//     "contype_type": "",
//     "contype_height": "",
//     "contype_width": "",
//     "contype_code": ""
//   }

// //   ngOnInit(): void {


// this.wl.get().subscribe((data) => {
// //       this.recData = data;

// //     });
// //   }

// }

