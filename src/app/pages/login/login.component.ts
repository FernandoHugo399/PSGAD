import { ISuccessLogin, IFailedLogin } from './../../services/request.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Login } from '../login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('buttonShowHide') buttonShowHide: { nativeElement:  HTMLButtonElement; };
  @ViewChild('inputPassword') inputPassword:  { nativeElement:  HTMLInputElement; };

  user: Login = {
    email: '',
    password: ''
  }

  constructor(private AuthService: AuthService) {
  }

  ngOnInit(): void {
  }

  showHidePass(): void{
      if (this.inputPassword.nativeElement.attributes["type"].value === 'password') {
        this.inputPassword.nativeElement.setAttribute('type', 'text')
        this.buttonShowHide.nativeElement.innerText = 'Ocultar'
    }else {
      this.inputPassword.nativeElement.setAttribute('type', 'password')
      this.buttonShowHide.nativeElement.innerText = 'Mostrar'
      }
  }

  loginSubmit(): void {
    this.AuthService.login(this.user).subscribe((res)=>{
      this.AuthService.LoginSuccessful(<ISuccessLogin>res)
    }, (err: IFailedLogin)=>{
      this.AuthService.LoginFailed(err)
    })
  }
}
