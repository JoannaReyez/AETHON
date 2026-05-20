import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-user-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-favorites.html',
  styleUrl: './user-favorites.scss'
})
export class UserFavorites {
  constructor(public store: StoreService) {}
}
