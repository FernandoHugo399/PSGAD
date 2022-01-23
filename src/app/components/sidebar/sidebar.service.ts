import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ISidebarService } from './sidebar.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements ISidebarService {

  constructor(private router: Router) { }

  showHideMenu(sidebar: HTMLDivElement): void {
    const main = document.querySelectorAll('main')[0]
    addEventListener('resize',()=>{
      if(document.body.clientWidth > 920){
          if(sidebar.classList.contains('left')){
              sidebar.classList.remove('left');
              main.classList.remove('main-left')
          }
      }
    })

    if(sidebar.classList.contains('left')){
      sidebar.classList.remove('left');
      main.classList.remove('main-left')

    } else {
        main.classList.add('main-left')
        sidebar.classList.add('left')
    }
  }

  logout(): void{
    localStorage.setItem('token', 'null')
    this.router.navigate(['login'])
  }
}
