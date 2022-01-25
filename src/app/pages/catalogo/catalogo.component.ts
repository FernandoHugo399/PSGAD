import { CatalogoService } from './catalogo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  public asProducts: boolean = false
  constructor(private CatalogoService: CatalogoService) { }

  ngOnInit(): void {
    this.CatalogoService.allProducts().subscribe((res)=>{
      console.log(res)
    })
  }

}
