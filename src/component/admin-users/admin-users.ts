import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss'
})
export class AdminUsers {
  constructor(public store: StoreService) {}
}