import { Router } from '@angular/router';
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
  public successMessage = GlobalVarsLogin.asMessageSuccess
  public products: Product
  constructor(private CatalogoService: CatalogoService, private router: Router) { }

  ngOnInit(): void {
    GlobalVarsLogin.asMessageError = ''
    GlobalVarsLogin.asMessageSuccess = ''

    this.CatalogoService.allProducts().subscribe((res)=>{
      if(res.error){
        this.errorMessage = res.message

      }else if (res.authError){
        GlobalVarsLogin.asMessageError = 'Sua sessão expirou'
        this.router.navigate(['login'])

      } else {
        this.products = res
      }
    })
  }

}
