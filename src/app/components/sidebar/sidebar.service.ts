import { Injectable } from '@angular/core';
import { ISidebarService } from './sidebar.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements ISidebarService {

  constructor() { }

  showHideMenu(sidebar: HTMLDivElement): void {
    addEventListener('resize',()=>{
      if(document.body.clientWidth > 920){
          if(sidebar.classList.contains('left')){
              sidebar.classList.remove('left');
          }
      }
  })

    if(sidebar.classList.contains('left')){
      sidebar.classList.remove('left');

  } else {
      sidebar.classList.add('left')
  }
  }
}
