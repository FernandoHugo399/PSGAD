import { Router } from '@angular/router';
import { catchError, empty } from 'rxjs';
import { CategoriaService } from './categoria.service';
import  GlobalVarsLogin  from 'src/app/pages/login/login.model';
import { Component, OnInit } from '@angular/core';
import { ICategoria } from './categoria.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  public newCategory: string
  public categorias: ICategoria
  public errorMessage = GlobalVarsLogin.asMessageError
  public successMessage = GlobalVarsLogin.asMessageSuccess

  constructor(private CategoriaService: CategoriaService, private Router: Router) { }

  ngOnInit(): void {
    GlobalVarsLogin.asMessageError = ''
    GlobalVarsLogin.asMessageSuccess = ''
    this.CategoriaService.getCategorias().subscribe((res)=>{
      if(res.error){
        this.errorMessage = 'Ocorreu um erro ao listar as categorias'

      }else if (res.authError){
        GlobalVarsLogin.asMessageError = 'Sua sessão expirou'
        this.Router.navigate(['login'])

      } else {
        this.categorias = res
      }
    })
  }

  createCategory(): void{
    this.CategoriaService.createCategoria(this.newCategory).pipe(catchError((err)=>{
      this.errorMessage = 'Ocorreu um erro interno ao criar o produto'
      return empty()

    })).subscribe((res)=>{
      if(res.error){
        this.successMessage = ''
        this.errorMessage = res.message
        this.newCategory = ''

      } else if (res.authError){
        GlobalVarsLogin.asMessageError = 'Sua sessão expirou'
        this.Router.navigate(['login'])

      } else {
        this.errorMessage = ''
        this.successMessage = res.message
        this.newCategory = ''

        this.CategoriaService.getCategorias().subscribe((res)=>{
          if(res.error){
            this.errorMessage = 'Ocorreu um erro ao listar as categorias'
          } else {
            this.categorias = res
          }
        })
      }



    })

  }

}
