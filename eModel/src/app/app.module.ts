import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { ContainerWatchlistComponent } from './container-watchlist/container-watchlist.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ContainerBookingComponent } from './container-booking/container-booking.component';
import { TerminalComponent } from './terminal/terminal.component';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { InitialLandingComponent } from './initial-landing/initial-landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdatedateDirective } from './updatedate.directive';
import { UserInfoComponent } from './user-info/user-info.component';
import { FinalUserPaymentComponent } from './final-user-payment/final-user-payment.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MainLandingPageComponent } from './main-landing-page/main-landing-page.component';
import { ContainersComponent } from './containers/containers.component';
import { BookingService } from './booking.service';
import { UserrequestComponent } from './userrequest/userrequest.component';
import { AdminTerminalComponent } from './admin-terminal/admin-terminal.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminPaymentComponent } from './admin-payment/admin-payment.component';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { StatusComponent } from './status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialLoginComponent,
    ContainerWatchlistComponent,
    UserRegistrationComponent,
    ContainerBookingComponent,
    TerminalComponent,
    AdminControlComponent,
    InitialLandingComponent,
    UpdatedateDirective,
    UserInfoComponent,
    FinalUserPaymentComponent,
    MainLoginComponent,
    ForgotPasswordComponent,
    MainLandingPageComponent,
    UserrequestComponent,
    AdminTerminalComponent,
    AdminUserComponent,
    AdminPaymentComponent,
    AdminFeedbackComponent,
    ContainersComponent,
    FeedbackComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
