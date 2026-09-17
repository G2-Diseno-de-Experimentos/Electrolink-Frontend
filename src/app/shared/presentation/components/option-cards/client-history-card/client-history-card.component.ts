import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-history-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './client-history-card.component.html',
  styleUrl: './client-history-card.component.css'
})
export class ClientHistoryCardComponent {

}
