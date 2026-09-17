import { Component } from '@angular/core';
import { ScheduleCardComponent } from '../../components/option-cards/schedule-card/schedule-card.component';
import { ProfileCardComponent } from '../../components/option-cards/profile-card/profile-card.component';
import { CatalogCardComponent } from '../../components/option-cards/catalog-card/catalog-card.component';
import { ClientHistoryCardComponent } from '../../components/option-cards/client-history-card/client-history-card.component';
import { MetricsCardComponent } from '../../components/option-cards/metrics-card/metrics-card.component';
import { CertifiedForumsCardComponent } from '../../components/option-cards/certified-forums-card/certified-forums-card.component';
import { ZoneCardComponent } from '../../components/option-cards/zone-card/zone-card.component';
import { PortafolioCardComponent } from '../../components/option-cards/portafolio-card/portafolio-card.component';

@Component({
  selector: 'app-provider-dashboard',
  imports: [ScheduleCardComponent, ProfileCardComponent, CatalogCardComponent, ClientHistoryCardComponent, MetricsCardComponent, CertifiedForumsCardComponent, ZoneCardComponent, PortafolioCardComponent],
  standalone: true,
  templateUrl: './provider-dashboard.component.html',
  styleUrl: './provider-dashboard.component.css'
})
export class ProviderDashboardComponent {

}
