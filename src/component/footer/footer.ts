import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear = new Date().getFullYear();
  
  socialLinks = [
    { icon: 'bi-facebook', url: 'https://www.facebook.com/profile.php?id=61590060493106', name: 'Facebook' },
    // { icon: 'bi-instagram', url: 'https://www.instagram.com/', name: 'Instagram' },
    // { icon: 'bi-tiktok', url: 'https://www.tiktok.com/', name: 'TikTok' },
    { icon: 'bi-whatsapp', url: 'https://wa.me/522221936878', name: 'WhatsApp' },
    // { icon: 'bi-youtube', url: 'https://www.youtube.com/', name: 'YouTube' }
  ];

  navigationLinks = [
    { label: 'Nosotros', url: '#about' },
    { label: 'Servicios', url: '#services' },
    { label: 'Galería', url: '#gallery' },
    { label: 'Testimonios', url: '#testimonials' }
  ];

  schedule = [
    { day: 'Lunes – Viernes', time: '9:00 – 20:00' },
    { day: 'Sábado', time: '10:00 – 18:00' },
    // { day: 'Domingo', time: '[ Tu horario ]' }
  ];

  contactInfo = [
    { icon: 'bi-geo-alt-fill', text: 'Tlaxcala, México' },
    { icon: 'bi-telephone-fill', text: '+52 222 193 6878' },
    { icon: 'bi-envelope-fill', text: 'aethoninnovation@gmail.com' },
    { icon: 'bi-whatsapp', text: '+52 222 193 6878' }
  ];
}