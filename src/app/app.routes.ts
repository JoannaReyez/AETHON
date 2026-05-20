import { Routes } from '@angular/router';
import { Home } from '../component/home/home';
import { Productos } from '../component/productos/productos';
import { UserShell } from '../component/user-shell/user-shell';
import { UserDashboard } from '../component/user-dashboard/user-dashboard';
import { UserStore } from '../component/user-store/user-store';
import { UserCart } from '../component/user-cart/user-cart';
import { UserProfile } from '../component/user-profile/user-profile';
import { UserSettings } from '../component/user-settings/user-settings';
import { ProductDetail } from '../component/product-detail/product-detail';
import { AdminShell } from '../component/admin-shell/admin-shell';
import { AdminDashboard } from '../component/admin-dashboard/admin-dashboard';
import { AdminStore } from '../component/admin-store/admin-store';
import { AdminOrders } from '../component/admin-orders/admin-orders';
import { AdminUsers } from '../component/admin-users/admin-users';
import { AdminProducts } from '../component/admin-products/admin-products';
import { EmployeeShell } from '../component/employee-shell/employee-shell';
import { EmployeeDashboard } from '../component/employee-dashboard/employee-dashboard';
import { EmployeeProducts } from '../component/employee-products/employee-products';
import { EmployeeOrders } from '../component/employee-orders/employee-orders';
import { EmployeeCustomers } from '../component/employee-customers/employee-customers';
import { EmployeeInventory } from '../component/employee-inventory/employee-inventory';
import { EmployeeProfile } from '../component/employee-profile/employee-profile';
import { EmployeeSettings } from '../component/employee-settings/employee-settings';

export const routes: Routes = [
  { path: '', redirectTo: 'web', pathMatch: 'full' },
  { path: 'web', component: Home },
  { path: 'productos', component: Productos },
  {
    path: 'usuario',
    component: UserShell,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDashboard },
      { path: 'tienda', component: UserStore },
      { path: 'carrito', component: UserCart },
      { path: 'mis-compras', redirectTo: 'carrito', pathMatch: 'full' },
      { path: 'perfil', component: UserProfile },
      { path: 'favoritos', redirectTo: 'carrito', pathMatch: 'full' },
      { path: 'configuracion', component: UserSettings },
      { path: 'producto/:id', component: ProductDetail }
    ]
  },
  {
    path: 'admin',
    component: AdminShell,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'tienda', component: AdminStore },
      { path: 'productos', component: AdminProducts },
      { path: 'ordenes', component: AdminOrders },
      { path: 'usuarios', component: AdminUsers },
      { path: 'perfil', component: AdminDashboard }
    ]
  },
  {
    path: 'empleado',
    component: EmployeeShell,
    children: [
      { path: '', redirectTo: 'dashboard-empleado', pathMatch: 'full' },
      { path: 'dashboard-empleado', component: EmployeeDashboard },
      { path: 'productos-empleado', component: EmployeeProducts },
      { path: 'pedidos-empleado', component: EmployeeOrders },
      { path: 'clientes-empleado', component: EmployeeCustomers },
      { path: 'inventario-empleado', component: EmployeeInventory },
      { path: 'perfil-empleado', component: EmployeeProfile },
      { path: 'configuracion-empleado', component: EmployeeSettings }
    ]
  }
];
