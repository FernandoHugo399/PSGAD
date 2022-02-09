import { Router } from '@angular/router';
import GlobalVars from '../../services/global/global.model'
import { CatalogoService } from './catalogo.service';
import { Component, OnInit } from '@angular/core';
import { IAllValidProduct } from 'src/app/services/global/products.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  public errorMessage = GlobalVars.asMessageError
  public successMessage = GlobalVars.asMessageSuccess
  public products: IAllValidProduct
  constructor(private CatalogoService: CatalogoService, private router: Router) { }

  ngOnInit(): void {
    GlobalVars.asMessageError = ''
    GlobalVars.asMessageSuccess = ''

    this.CatalogoService.allProducts().subscribe((res)=>{
      if(res.error){
        this.errorMessage = res.message

      }else if (res.authError){
        GlobalVars.asMessageError = 'Sua sessão expirou'
        this.router.navigate(['login'])

      } else {
        this.products = res
      }
    })
  }

}
