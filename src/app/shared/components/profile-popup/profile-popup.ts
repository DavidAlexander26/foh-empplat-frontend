import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDivider } from "@angular/material/divider";
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-profile-popup',
  imports: [MatDivider],
  templateUrl: './profile-popup.html',
  styleUrl: './profile-popup.scss',
})
export class ProfilePopup {

  constructor(private router: Router) {}

  onViewProfile() {
    this.router.navigate(['/perfil']);
  }

  onLogout() {
    console.log('Cerrando sesión...');
    // Aquí implementa tu lógica de logout
    // Por ejemplo: this.authService.logout();
    // this.router.navigate(['/login']);
  }
}
