import { AddProdutoService } from './add-produto.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.component.html',
  styleUrls: ['./add-produto.component.css']
})
export class AddProdutoComponent implements OnInit {
  @ViewChild('previewImage') previewImage: {nativeElement: HTMLImageElement}
  @ViewChild('inpFiles') inpFiles: {nativeElement: HTMLInputElement}
  constructor(private AddProdutoService: AddProdutoService) { }

  ngOnInit(): void {
  }

  readURL(archive: any){
   this.AddProdutoService.readURL(archive, this.previewImage.nativeElement)
  }

  clearPreview(){
    this.AddProdutoService.clearPreview(this.previewImage.nativeElement, this.inpFiles.nativeElement)
  }
}
