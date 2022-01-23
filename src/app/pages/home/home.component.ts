import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private orders: any[];

  constructor(private HomeService: HomeService) { }

  public ngOnInit(): void{
    this.HomeService.pendingOrders().subscribe((res)=>{
      console.log(res)
    })
  }

}
