import { IAddProdutoService } from './add-produto.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddProdutoService implements IAddProdutoService {
  constructor() { }

  readURL(archive: any , preImage: HTMLImageElement): void{
    if (archive.target.files && archive.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
        console.log(preImage.setAttribute('src', e.target.result))
      };
      reader.readAsDataURL(archive.target.files[0]);
    }
  }

  clearPreview(img: HTMLImageElement, inp: HTMLInputElement): void{
    img.setAttribute('src', '')
    inp.value = ''
  }
}
