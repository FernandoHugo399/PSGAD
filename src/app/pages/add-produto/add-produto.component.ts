import { Router } from '@angular/router';
import { AddProdutoService } from './add-produto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import GlobalVars from '../../services/global/global.model'
import { IAllCategory } from 'src/app/services/global/categories.model';
import { IProduct } from 'src/app/services/global/products.model';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.component.html',
  styleUrls: ['./add-produto.component.css']
})
export class AddProdutoComponent implements OnInit {
  @ViewChild('form') form: {nativeElement: HTMLFormElement}
  @ViewChild('previewImage') previewImage: {nativeElement: HTMLImageElement}
  @ViewChild('inpFiles') inpFiles: {nativeElement: HTMLInputElement}
  constructor(private AddProdutoService: AddProdutoService, private router: Router) { }

  public errorMessage = GlobalVars.asMessageError;
  public categories: IAllCategory;
  public Product: IProduct = {
    name: '',
    price: '',
    category: '',
    description: '',
    file: undefined
  }


  ngOnInit(): void {
    GlobalVars.asMessageError = ''

    this.AddProdutoService.getCategorias().subscribe((res)=>{
      if(res.error){
        GlobalVars.asMessageError = res.message
        this.router.navigate([''])

      }else if (res.authError){
        GlobalVars.asMessageError = 'Sua sessão expirou'
        this.router.navigate(['login'])

      } else {
        this.categories = res
      }
    })
  }

  readURL(archive: Event){
   this.AddProdutoService.readURL(archive, this.previewImage.nativeElement, this.Product)
  }

  clearPreview(){
    this.AddProdutoService.clearPreview(this.previewImage.nativeElement, this.inpFiles.nativeElement, this.Product)
  }

  changeCategorie(event: Event){
    this.Product.category = (event.target as HTMLInputElement).value
  }

  createProduct(e:Event){
    e.preventDefault()
    this.AddProdutoService.createProduct(this.Product).subscribe((res)=>{
      if(res.error){
        this.errorMessage = res.message
        this.Product.name = ''
        this.Product.price = '',
        this.Product.category = '',
        this.Product.description = '',
        this.clearPreview()

      }else if (res.authError){
        GlobalVars.asMessageError = 'Sua sessão expirou'
        this.router.navigate(['login'])

      } else {
        GlobalVars.asMessageSuccess = 'Produto criado com sucesso'
        this.router.navigate(['catalogo'])
      }
    })
  }
}
