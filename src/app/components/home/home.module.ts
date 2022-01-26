import { EstatisticasComponent } from './../../pages/estatisticas/estatisticas.component';
import { AddProdutoComponent } from './../../pages/add-produto/add-produto.component';
import { CatalogoComponent } from './../../pages/catalogo/catalogo.component';
import { HomeComponent } from './../../pages/home/home.component';
import { HelpComponent } from './../../pages/help/help.component';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    SidebarComponent,
    HelpComponent,
    HomeComponent,
    CatalogoComponent,
    AddProdutoComponent,
    EstatisticasComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
