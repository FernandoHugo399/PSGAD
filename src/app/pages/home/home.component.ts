import { Router } from '@angular/router';
import { IOrders } from './home.model';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  orders: IOrders;
  haveOrders: boolean;

  constructor(private HomeService: HomeService, private Router: Router) { }

  public ngOnInit(): void{
    this.HomeService.pendingOrders().subscribe((res)=>{
      this.orders = res

      if(this.orders.length !== 0){
        this.haveOrders = true
      } else {
        this.haveOrders = false
      }
    }, (err)=>{
      this.Router.navigate(['login'])
    })
  }

}
