import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { catchError, of, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IProcessLogin } from 'src/app/pages/login/login.model';
import GlobalVarsLogin from 'src/app/pages/login/login.model';

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
    })).pipe(catchError((err:IProcessLogin)=>{
      GlobalVarsLogin.asMessageError = 'Ocorreu um erro ao efetuar a conexão'
      this.Router.navigate(['login'])
      return of(false)
    }))
  }

}
