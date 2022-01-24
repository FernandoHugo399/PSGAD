import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { catchError, empty, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private AuthService: AuthService, private Router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.AuthService.verify().pipe(map((resul):boolean =>{
      if(resul.authError){
        this.Router.navigate(['login'])
        return false
      }

      return true
    })).pipe(catchError((err)=>{
      this.Router.navigate(['login'])
      return empty()
    }))
  }

}
