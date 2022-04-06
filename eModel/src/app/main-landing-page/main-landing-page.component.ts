import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-main-landing-page',
  templateUrl: './main-landing-page.component.html',
  styleUrls: ['./main-landing-page.component.css']
})
export class MainLandingPageComponent implements OnInit {

  constructor(private router:Router, private ds:UserDataService) { }
  
  logo="../../assets/images/landing_page/logo.png";
  hero="../../assets/images/landing_page/Intro_Video.mp4";
  advent_logo="../../assets/images/landing_page/advent-logo.png";
  herologo="../../assets/images/landing_page/video-logo.png";
  service_img1="../../assets/images/landing_page/port_manager.png";
  service_img2="../../assets/images/landing_page/intermodal_manager.png";
  service_img3="../../assets/images/landing_page/appointments.png";
  service_img4="../../assets/images/landing_page/cargo_visibility.png";
  service_img5="../../assets/images/landing_page/fees.png";
  service_img6="../../assets/images/landing_page/data_manager.png";
  email="../../assets/images/landing_page/email.png";
  ngOnInit(): void {
    this.ds.logintype="";
  }

  login()
  {
    this.router.navigate(['/','mainlogin']);
  }
}
