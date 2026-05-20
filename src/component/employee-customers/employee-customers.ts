import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  status: 'Activo' | 'Inactivo';
  company: string;
  avatar: string;
}

@Component({
  selector: 'app-employee-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-customers.html',
  styleUrl: './employee-customers.scss'
})
export class EmployeeCustomers {
  searchTerm = signal('');
  statusFilter = signal('Todos');
  selectedCustomer = signal<Customer | null>(null);

  readonly customers = signal<Customer[]>([
    { id: 1, name: 'Ana Martínez', email: 'ana.martinez@empresa.com', phone: '+52 811 123 4567', orders: 12, status: 'Activo', company: 'Marketing Central', avatar: 'AM' },
    { id: 2, name: 'Luis Gómez', email: 'luis.gomez@empresa.com', phone: '+52 818 987 6543', orders: 8, status: 'Activo', company: 'Ventas Plus', avatar: 'LG' },
    { id: 3, name: 'Carla Peña', email: 'carla.pena@empresa.com', phone: '+52 811 321 9876', orders: 4, status: 'Inactivo', company: 'Logística Pro', avatar: 'CP' },
    { id: 4, name: 'Diego Ruiz', email: 'diego.ruiz@empresa.com', phone: '+52 812 456 7890', orders: 17, status: 'Activo', company: 'Ecommerce Team', avatar: 'DR' }
  ]);

  readonly statuses = ['Todos', 'Activo', 'Inactivo'];

  readonly filteredCustomers = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const filter = this.statusFilter();

    return this.customers().filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(search) || customer.email.toLowerCase().includes(search) || customer.phone.includes(search);
      const matchesStatus = filter === 'Todos' || customer.status === filter;
      return matchesSearch && matchesStatus;
    });
  });

  viewProfile(customer: Customer): void {
    this.selectedCustomer.set(customer);
  }

  contactCustomer(customer: Customer): void {
    window.alert(`Contactar a ${customer.name} a través de ${customer.email}`);
  }
}
