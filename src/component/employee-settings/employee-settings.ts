import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-employee-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-settings.html',
  styleUrls: ['./employee-settings.scss']
})
export class EmployeeSettings {
  theme = signal('Claro');
  notifications = signal(true);
  appearance = signal('Claro');
  sessionActivity = signal(true);

  constructor(public store: StoreService) {
    this.theme.set(this.store.activeTheme());
    this.notifications.set(this.store.notificationsEnabled());
  }

  toggleTheme(): void {
    this.store.toggleTheme();
    this.theme.set(this.store.activeTheme());
  }

  toggleNotifications(): void {
    this.store.toggleNotifications();
    this.notifications.set(this.store.notificationsEnabled());
  }

  savePreferences(): void {
    window.alert('Preferencias guardadas correctamente.');
  }
}
