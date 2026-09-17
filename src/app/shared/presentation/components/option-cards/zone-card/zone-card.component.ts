import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-zone-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './zone-card.component.html',
  styleUrl: './zone-card.component.css'
})
export class ZoneCardComponent {

}
