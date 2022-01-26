import { Router } from '@angular/router';
import { IOrders } from './home.model';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import GlobalVarsLogin from '../login/login.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public errorMessage = GlobalVarsLogin.asMessageError
  orders: IOrders;

  constructor(private HomeService: HomeService, private Router: Router) { }

  public ngOnInit(): void{
    GlobalVarsLogin.asMessageError = ''

    this.HomeService.pendingOrders().subscribe((res)=>{
      if(res.error){
        this.errorMessage = res.message
      } else {
        this.orders = res
      }


    })
  }

}
