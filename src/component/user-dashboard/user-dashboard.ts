import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../app/store.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss'
})
export class UserDashboard {
  @ViewChild('carousel', { static: true }) carouselRef?: ElementRef<HTMLElement>;

  private carouselTimer?: ReturnType<typeof setInterval>;
  private carouselPaused = false;

  constructor(public store: StoreService) {}

  ngAfterViewInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  pauseCarousel(): void {
    this.carouselPaused = true;
  }

  resumeCarousel(): void {
    this.carouselPaused = false;
  }

  private startCarousel(): void {
    const carousel = this.carouselRef?.nativeElement;
    if (!carousel) {
      return;
    }

    this.carouselTimer = setInterval(() => {
      if (this.carouselPaused) {
        return;
      }

      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      if (maxScrollLeft <= 0) {
        return;
      }

      const step = 0.6;
      const nextScrollLeft = carousel.scrollLeft + step;

      if (nextScrollLeft >= maxScrollLeft - 1) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollLeft = nextScrollLeft;
      }
    }, 16);
  }

  private stopCarousel(): void {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
      this.carouselTimer = undefined;
    }
  }
}
