import { Component, OnInit, OnDestroy, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Footer], 
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {

  isScrolled = false;
  menuOpen = false;
  heroVisible = false;

  services = [
    {
      icon: 'bi-stars',
      name: 'Servicio Premium',
      desc: 'Describe aquí tu servicio principal. Qué incluye, duración y beneficios para el cliente.',
      price: 'Desde $299',
      badge: 'Popular'
    },
    {
      icon: 'bi-lightning-charge-fill',
      name: 'Producto Destacado',
      desc: 'Agrega aquí la descripción de tu producto o servicio más vendido con todos los detalles.',
      price: 'Desde $199',
      badge: 'Nuevo'
    },
    {
      icon: 'bi-gift-fill',
      name: 'Promoción Especial',
      desc: 'Crea una oferta irresistible. Describe el valor y el ahorro que obtiene tu cliente.',
      price: 'Oferta: $149',
      badge: '20% OFF'
    },
    {
      icon: 'bi-diamond-fill',
      name: 'Paquete VIP',
      desc: 'Para clientes que quieren lo mejor. Incluye beneficios exclusivos y atención prioritaria.',
      price: 'Desde $499',
      badge: null
    },
    {
      icon: 'bi-calendar2-check-fill',
      name: 'Reserva tu Cita',
      desc: 'Agenda fácilmente tu visita. Disponibilidad inmediata y confirmación al instante.',
      price: 'Gratis',
      badge: null
    },
    {
      icon: 'bi-patch-check-fill',
      name: 'Tu Servicio Aquí',
      desc: 'Este espacio es para tu 6to servicio o producto. Personaliza el icono, nombre y precio.',
      price: 'A consultar',
      badge: null
    }
  ];

  testimonials = [
    {
      text: 'Excelente servicio, totalmente recomendado. Desde que los descubrí no voy a otro lugar. La calidad y atención son incomparables.',
      name: 'María González',
      role: 'Cliente satisfecha ⭐'
    },
    {
      text: 'Increíble experiencia desde el primer momento. El equipo es muy profesional y siempre superan mis expectativas.',
      name: 'Carlos Ramírez',
      role: 'Cliente frecuente ⭐'
    },
    {
      text: 'Lo que más me gusta es la atención personalizada. Sienten que les importas como cliente. Definitivamente volvería.',
      name: 'Ana Martínez',
      role: 'Clienta habitual ⭐'
    }
  ];

  ngOnInit(): void {
    this.heroVisible = true;
    this.setupScrollAnimation();
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 80;
    this.checkScrollAnimations();
  }

  private setupScrollAnimation(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.15 }
    );

    setTimeout(() => {
      document.querySelectorAll('.service-card, .testimonial-card, .gallery-item, .feature-item, .about-grid')
        .forEach(el => observer.observe(el));
    }, 500);
  }

  private checkScrollAnimations(): void {}
}