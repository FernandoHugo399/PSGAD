export interface IAddProdutoService{
  readURL: (archive: any , preImage: HTMLImageElement) => void;
  clearPreview: (img: HTMLImageElement, inp: HTMLInputElement) => void;
}
