import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import GlobalVars from '../../services/global/global.model'
import { IAllPendingOrders } from 'src/app/services/global/orders.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public errorMessage = GlobalVars.asMessageError
  orders: IAllPendingOrders;

  constructor(private HomeService: HomeService, private Router: Router) { }

  public ngOnInit(): void{
    GlobalVars.asMessageError = ''

    this.HomeService.pendingOrders().subscribe((res)=>{
      if(res.error){
        this.errorMessage = res.message

      } else if (res.authError){
        GlobalVars.asMessageError = 'Sua sessão expirou'
        this.Router.navigate(['login'])
      }
       else {
        this.orders = res
      }


    })
  }

}
