import { LoginService } from './login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Login, IFailedLogin, ISuccessLogin } from './login.model';

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

  constructor(private LoginService: LoginService) {  }

  ngOnInit(): void {  }

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
    this.LoginService.login(this.user).subscribe((res)=>{
      this.LoginService.LoginSuccessful(<ISuccessLogin>res)
    }, (err: IFailedLogin)=>{
      this.LoginService.LoginFailed(err, this.user)
    })
  }
}
