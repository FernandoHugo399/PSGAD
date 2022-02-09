import { Router } from '@angular/router';
import { catchError, empty } from 'rxjs';
import { CategoriaService } from './categoria.service';
import GlobalVars from '../../services/global/global.model'
import { Component, OnInit } from '@angular/core';
import { IAllCategory } from 'src/app/services/global/categories.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  public newCategory: string
  public categories: IAllCategory
  public errorMessage = GlobalVars.asMessageError
  public successMessage = GlobalVars.asMessageSuccess

  constructor(private CategoriaService: CategoriaService, private Router: Router) { }

  ngOnInit(): void {
    GlobalVars.asMessageError = ''
    GlobalVars.asMessageSuccess = ''
    this.CategoriaService.getCategory().subscribe((res)=>{
      if(res.error){
        this.errorMessage = 'Ocorreu um erro ao listar as categorias'

      }else if (res.authError){
        GlobalVars.asMessageError = 'Sua sessão expirou'
        this.Router.navigate(['login'])

      } else {
        this.categories = res
      }
    })
  }

  createCategory(): void{
    this.CategoriaService.createCategory(this.newCategory).pipe(catchError((err)=>{
      this.errorMessage = 'Ocorreu um erro interno ao criar o produto'
      return empty()

    })).subscribe((res)=>{
      if(res.error){
        this.successMessage = ''
        this.errorMessage = res.message
        this.newCategory = ''

      } else if (res.authError){
        GlobalVars.asMessageError = 'Sua sessão expirou'
        this.Router.navigate(['login'])

      } else {
        this.errorMessage = ''
        this.successMessage = res.message
        this.newCategory = ''

        this.CategoriaService.getCategory().subscribe((res)=>{
          if(res.error){
            this.successMessage = ''
            this.errorMessage = 'Ocorreu um erro ao listar as categorias'

          } else if (res.authError){
            GlobalVars.asMessageError = 'Sua sessão expirou'
            this.Router.navigate(['login'])

          } else {
            this.categories = res
          }
        })
      }
    })
  }

  deleteCategory(id: number){
   this.CategoriaService.deleteCategory(id).pipe(catchError((err)=>{
    this.successMessage = ''
    this.errorMessage = 'Ocorreu um erro interno ao deletar a categoria. Verifique se não está ligada a algum produto'
    return empty()

  })).subscribe((res)=>{
    console.log(res)
    if(res.error){
      this.successMessage = ''
      this.errorMessage = res.message

    } else if (res.authError){
      GlobalVars.asMessageError = 'Sua sessão expirou'
      this.Router.navigate(['login'])

    } else {
      this.errorMessage = ''
      this.successMessage = res.message

      this.CategoriaService.getCategory().subscribe((res)=>{
        if(res.error){
          this.successMessage = ''
          this.errorMessage = 'Ocorreu um erro ao listar as categorias'

        }else if (res.authError){
          GlobalVars.asMessageError = 'Sua sessão expirou'
          this.Router.navigate(['login'])

        } else {
          this.categories = res
        }
      })
    }
   })
  }

}
