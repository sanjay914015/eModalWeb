import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackServicesService } from '../feedback-services.service';
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(public fb: FormBuilder, public ds: FeedbackServicesService, private usrds: UserDataService,private route:Router) { }

  feedbackFormData: any;
  feedbackData: any;

  ngOnInit(): void {
    this.feedbackFormData = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  date = new Date();
  postFeedbackData() {
    this.ds.getFeedbackData().subscribe((data:any) => {
      this.feedbackData = {
        "id": "FB" + (60000 +data.length),
        "usertype": this.usrds.logintype,
        "userid": this.usrds.loginid,
        "feedaback_type": this.feedbackFormData.value.title,
        "description": this.feedbackFormData.value.description,
        "feedback_time": this.date,
        "read_status": false
      }
      this.ds.postFeedbackData(this.feedbackData).subscribe();
    });

    this.route.navigate(['/InitialLanding/','']);
    // console.log(this.feedbackData);
  }

}
