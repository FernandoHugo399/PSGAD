import { SidebarService } from './sidebar.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidebar') sidebar: {nativeElement: HTMLDivElement}
  constructor(private SidebarService: SidebarService) { }

  ngOnInit(): void {

  }

  showHideMenu(): void {
    this.SidebarService.showHideMenu(this.sidebar.nativeElement)
  }

  logout(): void {
    this.SidebarService.logout()
  }
}
