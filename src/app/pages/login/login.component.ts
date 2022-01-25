import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ILogin, IProcessLogin } from './login.model';
import { map, catchError, empty } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('buttonShowHide') buttonShowHide: { nativeElement:  HTMLButtonElement; };
  @ViewChild('inputPassword') inputPassword:  { nativeElement:  HTMLInputElement; };

  user: ILogin = {
    email: '',
    password: ''
  }

  public errorMessage: string | boolean;

  constructor(private LoginService: LoginService, private Router: Router) {  }

  ngOnInit(): void {  }

  showHidePass(): void{
    this.LoginService.showHidePass(this.buttonShowHide.nativeElement, this.inputPassword.nativeElement)
  }

  loginSubmit(): void {
    this.LoginService.login(this.user).pipe(map((res)=>{
      if(!res.error){
        this.LoginService.LoginSuccessful(res)
      } else {
        this.errorMessage = res.message
        this.LoginService.LoginFailed(res, this.user)
      }
    })).pipe(catchError((err: IProcessLogin)=>{
      console.log(err)
      this.errorMessage = err.statusText
      this.LoginService.LoginFailed(err, this.user)
      return empty()
    })).subscribe()
  }
}
