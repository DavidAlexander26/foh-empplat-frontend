import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private sidenav?: MatSidenav;

  register(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  toggle() {
    this.sidenav?.toggle();
  }

  close() {
    this.sidenav?.close();
  }

  open() {
    this.sidenav?.open();
  }
}
