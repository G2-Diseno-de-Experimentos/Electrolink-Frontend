import { Component, OnInit } from '@angular/core';
import { ComponentFormComponent } from '../component-form/component-form.component';
import { ComponentListComponent } from '../component-list/component-list.component';
import { Component as ElectricalComponent } from '../../../domain/model/component.entity';
import { ComponentService } from '../../../../inventory/services/component.service'; // Asegúrate que exista

@Component({
  selector: 'app-component-page',
  standalone: true,
  imports: [ComponentFormComponent, ComponentListComponent],
  templateUrl: './component-page.component.html',
  styleUrls: ['./component-page.component.css']
})
export class ComponentPageComponent implements OnInit {
  components: ElectricalComponent[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private componentService: ComponentService) {}

  ngOnInit(): void {
    this.loadComponents();
  }

  loadComponents(): void {
    this.isLoading = true;
    this.error = null;

    this.componentService.getAll().subscribe({
      next: (data) => {this.components = data; console.log('Componentes eléctricos:', data);},
      error: (err) => this.error = err.message,
      complete: () => this.isLoading = false
    });
  }

  onComponentCreated(): void {
    this.loadComponents(); // Refresca la lista si se añade uno nuevo
  }
}
