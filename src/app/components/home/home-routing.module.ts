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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
