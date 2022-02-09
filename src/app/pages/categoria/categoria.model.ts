import { Observable } from 'rxjs';
import { IAllCategory } from 'src/app/services/global/categories.model';
import { IRequest } from 'src/app/services/global/global.model';

export interface ICategoriaService{
  getCategory: ()=> Observable<IAllCategory>;
  createCategory: (nome: string)=> Observable<IRequest>;
  deleteCategory: (id: number)=> Observable<IRequest>
}
