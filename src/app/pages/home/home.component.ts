import { IFailedAuth } from './../../services/auth/auth.model';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private AuthService: AuthService) { }

  public ngOnInit(): void{
    this.AuthService.verify().subscribe(()=>{
    },(err: IFailedAuth)=>{
      this.AuthService.VerifyFailed(err)
    })
  }

}
