import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-settings.html',
  styleUrl: './user-settings.scss'
})
export class UserSettings {
  constructor(public store: StoreService) {}
}
