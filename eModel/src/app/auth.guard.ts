import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private dcs:UserDataService , private router:Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>|boolean {
    return this.checkLogin();
  }
  
  checkLogin():Observable<boolean>|boolean{
    if(this.dcs.logintype=="admin"){
      return true;
    }
    else{
      this.router.navigate(['/','home']);
      return false;
    }
  }


}
