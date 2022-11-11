import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ManufacturingGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(localStorage.getItem("username"));
      if(localStorage.getItem("username") && localStorage.getItem("token")) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
  }
  
}
