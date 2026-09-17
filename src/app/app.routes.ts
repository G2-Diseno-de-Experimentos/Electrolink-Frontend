import { Routes } from '@angular/router';

// Páginas públicas
import { SignInComponent } from './iam/presentation/pages/sign-in/sign-in.component';
import { SignUpComponent } from './iam/presentation/pages/sign-up/sign-up.component';

// Dashboard general
import { HomeownerDashboardComponent } from './shared/presentation/pages/homeowner-dashboard/homeowner-dashboard.component';
import { WelcomeComponent } from './shared/presentation/pages/welcome-dashboard/welcome-dashboard.component'; // importa el nuevo componente

// Gestión de componentes e inventario
import { TypeManagementPageComponent } from './shared/presentation/components/component-type-page/component-type-page.component';
import { ComponentPageComponent } from './shared/presentation/components/component-page/component-page.component';
import { TechnicianInventoryPageComponent } from './inventory/inventory-page/inventory-page.component';

// Gestión de propiedades
import { PropertyManagementPageComponent } from './property/presentation/components/property-management-page/property-management-page.component';

// Búsqueda y detalles de técnicos
import { RequestPage } from './service-design-and-planning/pages/request-page/request.page';
import { SchedulePage } from './service-design-and-planning/pages/schedule-page/schedule.page';
import { ServicePage } from './service-design-and-planning/pages/service-page/service.page';

import { ServiceMonitoringPageComponent } from './monitoring/pages/service-monitoring-page.component';

// Dashboard de proveedor (opcional, si se usa)
import { ProviderDashboardComponent } from './shared/presentation/pages/provider-dashboard/provider-dashboard.component';

export const routes: Routes = [
  // Redirección inicial al componente Welcome (Página de bienvenida)
  { path: '', component: WelcomeComponent },

  // Rutas para autenticación
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },

  // Rutas de dashboard central (para Homeowner)
  { path: 'dashboard/homeowner', component: HomeownerDashboardComponent },

  // Rutas de funcionalidades técnicas
  { path: 'component-type', component: TypeManagementPageComponent },
  { path: 'component-management', component: ComponentPageComponent },
  { path: 'technician-inventory', component: TechnicianInventoryPageComponent },
  {path: 'requests', component: RequestPage},
  { path: 'schedules', component: SchedulePage },
  {path: 'services', component: ServicePage},
  // Funcionalidades del propietario (Homeowner)
  { path: 'property', component: PropertyManagementPageComponent },

  {path: 'service-monitoring', component: ServiceMonitoringPageComponent},
  // Redirección por defecto
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Usamos la ruta principal cuando no haya coincidencia
];
