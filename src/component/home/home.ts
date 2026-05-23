import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, signal } from '@angular/core';
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
export class Home implements OnInit, AfterViewInit, OnDestroy {

  isScrolled = false;
  menuOpen = false;
  heroVisible = false;

  services = [
    {
      icon: 'bi-window-sidebar',
      name: 'Página Sencilla',
      subtitle: '/ Negocio Pequeño',
      desc: 'Ideal para negocios pequeños que necesitan presencia en línea.',
      price: '$300 - $600',
      initialPrice: '$2,000 - $4,000',
      examples: 'Barberías, cafeterías, tiendas pequeñas, estéticas y papelerías.',
      includes: ['Inicio', 'Servicios', 'Contacto', 'WhatsApp', 'Galería de imágenes', 'Diseño personalizado', 'Adaptación a celular y computadora', 'Formulario de contacto', 'Integración con redes sociales', 'Mapa de ubicación', 'Enlace directo a WhatsApp'],
      badge: null
    },
    {
      icon: 'bi-graph-up-arrow',
      name: 'Página Más Profesional',
      subtitle: '',
      desc: 'Para empresas que buscan más secciones y un diseño profesional.',
      price: '$600 - $1,200',
      initialPrice: '$5,000 - $10,000',
      examples: 'Diseño más elaborado, varias secciones, formularios avanzados, panel administrativo y correos empresariales.',
      includes: ['Todo lo del paquete anterior', 'Diseño más elaborado y profesional', 'Secciones ilimitadas', 'Formularios avanzados', 'Panel administrativo para editar contenido', 'Catálogo de productos o servicios', 'Animaciones y efectos visuales', 'Correos empresariales', 'Integración con herramientas externas', 'Soporte prioritario'],
      badge: null
    },
    {
      icon: 'bi-cart3',
      name: 'Tienda en Línea',
      subtitle: '/ Sistema',
      desc: 'Soluciones completas para vender en línea y gestionar tu negocio.',
      price: '$1,200 - $3,000',
      initialPrice: '$12,000 - $25,000',
      examples: 'Ecommerce, punto de venta, reservaciones, inventario y sistema personalizado.',
      includes: ['Tienda en línea completa', 'Carrito de compras', 'Panel administrativo avanzado', 'Gestión de productos e inventario', 'Punto de venta (POS)', 'Sistema de reservaciones', 'Reportes y estadísticas', 'Sistema personalizado según necesidades', 'Soporte y mantenimiento especializado'],
      badge: null
    }
  ];

  selectedService: any = null;

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

  galleryItems = [
    {
      id: 1,
      type: 'video',
      src: 'video1.mp4',
      poster: 'logo1.jpeg',
      title: 'Visión de producto inteligente',
      subtitle: 'Cinematic AI',
      tag: 'Video',
      variant: 'tall'
    },
    {
      id: 2,
      type: 'video',
      src: 'video2.mp4',
      poster: 'logo2.jpg',
      title: 'Narrativa digital avanzada',
      subtitle: 'Experiencia IA',
      tag: 'Video',
      variant: ''
    },
    {
      id: 3,
      type: 'video',
      src: 'video3.mp4',
      poster: 'logo2.jpg',
      title: 'Futuro en movimiento',
      subtitle: 'Premium Motion',
      tag: 'Video',
      variant: 'wide'
    }
  ];

  trackByGallery(index: number, item: { id: number }): number {
    return item.id;
  }

  ngOnInit(): void {
    this.heroVisible = true;
    this.setupScrollAnimation();
  }

  ngAfterViewInit(): void {
    const videos = document.querySelectorAll<HTMLVideoElement>('video.gallery-media');
    videos.forEach(video => {
      video.muted = true;
      video.autoplay = true;
      video.playsInline = true;
      video.loop = true;
      video.play().catch(() => {
        // Fallback silencioso si el navegador bloquea autoplay
      });
    });
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 80;
    this.checkScrollAnimations();
  }

  @HostListener('document:keydown.escape', [])
  onEscapeKey(): void {
    this.closeServiceModal();
  }

  openServiceModal(service: any): void {
    this.selectedService = service;
  }

  closeServiceModal(): void {
    this.selectedService = null;
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
