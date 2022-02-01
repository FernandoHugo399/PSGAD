import { BalancoDeVendasComponent } from './../../pages/balanco-de-vendas/balanco-de-vendas.component';
import { CategoriaComponent } from './../../pages/categoria/categoria.component';
import { AddProdutoComponent } from './../../pages/add-produto/add-produto.component';
import { EstatisticasComponent } from './../../pages/estatisticas/estatisticas.component';
import { CatalogoComponent } from './../../pages/catalogo/catalogo.component';
import { HelpComponent } from './../../pages/help/help.component';
import { IsAuthenticatedGuard } from './../../services/auth/is-authenticated.guard';
import { HomeComponent } from './../../pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'help',
    component: HelpComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path:'estatisticas',
    component: EstatisticasComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'addproduto',
    component: AddProdutoComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'categoria',
    component: CategoriaComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'balanco-de-vendas',
    component: BalancoDeVendasComponent,
    canActivate: [IsAuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
