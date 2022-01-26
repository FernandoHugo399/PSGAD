import { Product } from './catalogo.model';
import  GlobalVarsLogin  from 'src/app/pages/login/login.model';
import { CatalogoService } from './catalogo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  public errorMessage = GlobalVarsLogin.asMessageError
  public products: Product
  constructor(private CatalogoService: CatalogoService) { }

  ngOnInit(): void {
    GlobalVarsLogin.asMessageError = ''

    this.CatalogoService.allProducts().subscribe((res)=>{
      this.products = res
    })
  }

}
