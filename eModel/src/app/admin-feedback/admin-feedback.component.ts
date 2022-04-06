import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.css']
})
export class AdminFeedbackComponent implements OnInit {
  receivefeedbackdetails: any;

  constructor(public ht: AdminService, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.ht.getFeedbackData().subscribe((feedback_details) => this.show(feedback_details));
  }
show(data:any)
{
  this.receivefeedbackdetails = data;

}
Read(data:any)
{
  data.read_status = true;
  this.ht.putFeedbackData(data).subscribe((data) => this.show(data));
}

}
