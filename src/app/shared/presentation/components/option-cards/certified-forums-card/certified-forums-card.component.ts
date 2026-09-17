import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-certified-forums-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './certified-forums-card.component.html',
  styleUrl: './certified-forums-card.component.css'
})
export class CertifiedForumsCardComponent {

}
