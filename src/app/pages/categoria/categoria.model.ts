import { IAllCategory } from './../../services/global/global.model';
import { Observable } from 'rxjs';
import { IRequest } from 'src/app/services/global/global.model';

export interface ICategoriaService{
  getCategory: ()=> Observable<IAllCategory>;
  createCategory: (nome: string)=> Observable<IRequest>;
  deleteCategory: (id: number)=> Observable<IRequest>
}
