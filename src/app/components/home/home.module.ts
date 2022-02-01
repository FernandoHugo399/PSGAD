import { BalancoDeVendasComponent } from './../../pages/balanco-de-vendas/balanco-de-vendas.component';
import { FormsModule } from '@angular/forms';
import { EstatisticasComponent } from './../../pages/estatisticas/estatisticas.component';
import { AddProdutoComponent } from './../../pages/add-produto/add-produto.component';
import { CatalogoComponent } from './../../pages/catalogo/catalogo.component';
import { HomeComponent } from './../../pages/home/home.component';
import { HelpComponent } from './../../pages/help/help.component';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { CategoriaComponent } from 'src/app/pages/categoria/categoria.component';


@NgModule({
  declarations: [
    SidebarComponent,
    HelpComponent,
    HomeComponent,
    CatalogoComponent,
    AddProdutoComponent,
    EstatisticasComponent,
    CategoriaComponent,
    BalancoDeVendasComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
