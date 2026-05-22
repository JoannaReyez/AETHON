import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StoreService } from '../../app/store.service';
import { LoginModal } from '../../modales/login-modal/login-modal';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginModal],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isScrolled = false;
  menuOpen = false;
  showLoginModal = false;

  constructor(
    private router: Router,
    public store: StoreService,
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 80;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  openLoginModal(): void {
    this.closeMenu();
    this.showLoginModal = true;
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
  }

  handleLogin(credentials: { email: string; password: string; role?: string }): void {
    const result = this.store.login(credentials.email, credentials.password);
    if (!result.success) {
      return;
    }

    this.closeMenu();

    if (result.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
      return;
    }

    if (result.role === 'employee') {
      this.router.navigate(['/empleado/dashboard-empleado']);
      return;
    }

    this.router.navigate(['/usuario/dashboard']);
  }

  handleLogout(): void {
    this.store.logout();
    this.closeMenu();
    this.router.navigate(['/web']);
  }

}
