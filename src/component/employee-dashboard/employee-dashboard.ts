import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../app/store.service';

interface QuickCard {
  label: string;
  value: string;
  icon: string;
  accent: string;
}

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.scss'
})
export class EmployeeDashboard {
  readonly quickCards: QuickCard[] = [
    { label: 'Pedidos atendidos', value: '128', icon: 'bi-check2-circle', accent: 'rgba(16, 185, 129, 0.12)' },
    { label: 'Pedidos pendientes', value: '24', icon: 'bi-hourglass-split', accent: 'rgba(251, 191, 36, 0.12)' },
    { label: 'Clientes atendidos', value: '62', icon: 'bi-people-fill', accent: 'rgba(59, 130, 246, 0.12)' },
    { label: 'Productos gestionados', value: '88', icon: 'bi-box-seam', accent: 'rgba(251, 113, 133, 0.12)' }
  ];

  readonly actions = [
    { label: 'Revisar pedidos', icon: 'bi-bag-check' },
    { label: 'Actualizar inventario', icon: 'bi-arrow-repeat' },
    { label: 'Contactar cliente', icon: 'bi-chat-dots' },
    { label: 'Generar reporte', icon: 'bi-bar-chart-line' }
  ];

  readonly recentTasks = [
    { label: 'Actualizar estado de orden #1025', time: '1h atrás' },
    { label: 'Verificar stock de Producto Premium', time: '3h atrás' },
    { label: 'Responder consulta de cliente', time: '5h atrás' },
    { label: 'Preparar envíos para hoy', time: '7h atrás' }
  ];

  readonly activity = [
    { label: 'Pedidos nuevos', value: 14 },
    { label: 'Clientes nuevos', value: 5 },
    { label: 'Reabastecimiento', value: 7 }
  ];

  selectedMetric = signal('Resumen diario');

  readonly orderSummary = computed(() => this.store.orders().reduce((sum, order) => sum + order.total, 0));

  constructor(public store: StoreService) {}

  openAction(label: string): void {
    window.alert(`Acción rápida: ${label}`);
  }
}
