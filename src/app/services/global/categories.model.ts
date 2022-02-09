export interface IAllCategory{
  length: string
  categories:{
    id_categoria: number
    nome: string
  }[]
  error: string
  message: string
  authError: string
}
