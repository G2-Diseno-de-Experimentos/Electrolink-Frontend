import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './catalog-card.component.html',
  styleUrl: './catalog-card.component.css'
})
export class CatalogCardComponent {

}
