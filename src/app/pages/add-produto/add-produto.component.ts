import { Router } from '@angular/router';
import { ICategoria, IProduct } from './add-produto.model';
import { AddProdutoService } from './add-produto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import GlobalVarsLogin from '../login/login.model';

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

  public errorMessage = GlobalVarsLogin.asMessageError;
  public categories: ICategoria;
  public Product: IProduct = {
    nome: '',
    preco: '',
    categoria: '',
    descricao: '',
    file: undefined
  }


  ngOnInit(): void {
    GlobalVarsLogin.asMessageError = ''

    this.AddProdutoService.getCategorias().subscribe((res)=>{
      if(res.error){
        GlobalVarsLogin.asMessageError = res.message
        this.router.navigate([''])

      }else if (res.authError){
        GlobalVarsLogin.asMessageError = 'Sua sessão expirou'
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
    this.Product.categoria = (event.target as HTMLInputElement).value
  }

  createProduct(e:Event){
    e.preventDefault()
    this.AddProdutoService.createProduct(this.Product).subscribe((res)=>{
      if(res.error){
        this.errorMessage = res.message
        this.Product.nome = ''
        this.Product.preco = '',
        this.Product.categoria = '',
        this.Product.descricao = '',
        this.clearPreview()

      }else if (res.authError){
        GlobalVarsLogin.asMessageError = 'Sua sessão expirou'
        this.router.navigate(['login'])

      } else {
        GlobalVarsLogin.asMessageSuccess = 'Produto criado com sucesso'
        this.router.navigate(['catalogo'])
      }
    })
  }
}
