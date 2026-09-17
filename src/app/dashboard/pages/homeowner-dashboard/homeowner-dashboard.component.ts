import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { MatIconModule } from '@angular/material/icon';

interface NavItem {
  label: string;
  to: string;
  icon?: string;
}

@Component({
  selector: 'app-homeowner-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './homeowner-dashboard.component.html',
  styleUrls: ['./homeowner-dashboard.component.css']
})
export class HomeownerDashboardComponent {
  isBuyer = true;
  isAuthenticated = false;
  userName = ''; // ← nuevo

  readonly items_Home_Owner: NavItem[] = [
    { label: 'Properties', to: '/property-management' },
    { label: 'Requests', to: '/requests' },
    { label: 'Sevice-Monitoring', to: '/service-monitoring' },
  ];

  readonly items_Technician: NavItem[] = [
    { label: 'Inventory', to: '/technician-inventory' },
    { label: 'Components', to: '/component-management' },
    { label: 'Component Types', to: '/component-types' },
    { label: 'Schedules', to: '/schedules' },
    { label: 'Services', to: '/services' }
  ];

  constructor(private authService: AuthenticationService, private router: Router) {
    // Verificamos estado de sesión
    this.authService.isSignedIn.subscribe(status => {
      this.isAuthenticated = status;
    });

    // Obtenemos el username
    this.authService.currentUsername.subscribe(username => {
      this.userName = username;
    });
  }

  get activeItems(): NavItem[] {
    return this.isBuyer ? this.items_Home_Owner : this.items_Technician;
  }

  get changeLabel(): string {
    return this.isBuyer ? 'Switch to Technician' : 'Switch to Homeowner';
  }

  switchView(): void {
    if (!this.isAuthenticated) return;
    this.isBuyer = !this.isBuyer;
  }
}
