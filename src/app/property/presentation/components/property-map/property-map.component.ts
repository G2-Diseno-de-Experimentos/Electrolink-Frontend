import { Component, AfterViewInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Property } from '../../../../shared/domain/model/property.entity';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';

// La configuración del ícono no cambia, está bien como está.
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-property-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-map.component.html',
  styleUrls: ['./property-map.component.css']
})
export class PropertyMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() properties: Property[] | null = null;
  @Output() propertySelected = new EventEmitter<string>();

  // PASO 1: Generador de IDs únicos para cada instancia del mapa.
  private static mapIdCounter = 0;
  public mapId = `map-${PropertyMapComponent.mapIdCounter++}`;

  private map: L.Map | undefined;
  private markersLayer: L.FeatureGroup = L.featureGroup();

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['properties'] && this.map) {
      this.updateMarkers();
    }
  }

  // PASO 2: Implementar OnDestroy para limpiar el mapa.
  // Esto es CRUCIAL para evitar fugas de memoria y errores al cerrar el diálogo.
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  private initMap(): void {
    setTimeout(() => {
      if (this.map) return;

      this.map = L.map(this.mapId, {
        center: [-12.046374, -77.042793],
        zoom: 12
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      this.markersLayer.addTo(this.map);

      // --- LÍNEA CLAVE AÑADIDA ---
      // Esto le dice al mapa: "Oye, tu tamaño puede haber cambiado.
      // ¡Vuelve a calcular tus dimensiones y redibújate!"
      this.map.invalidateSize();
      // --------------------------

      this.updateMarkers();
    }, 100);
  }

  private updateMarkers(): void {
    // Limpiamos la capa de marcadores.
    this.markersLayer.clearLayers();

    if (!this.map || !this.properties || this.properties.length === 0) {
      return;
    }

    const validProperties = this.properties.filter(
      p => p.address?.latitude != null && p.address?.longitude != null
    );

    validProperties.forEach(property => {
      const marker = L.marker([property.address.latitude, property.address.longitude]);

      marker.bindPopup(`<b>${property.address.street || 'Sin dirección'}</b>`);

      marker.on('click', () => {
        this.propertySelected.emit(property.id);
        this.map?.flyTo([property.address.latitude, property.address.longitude], 15);
      });

      this.markersLayer.addLayer(marker);
    });

    // Ajustar el mapa para que se vean todos los marcadores.
    if (validProperties.length > 0) {
      try {
        const bounds = this.markersLayer.getBounds();
        if (bounds.isValid()) {
          this.map.fitBounds(bounds, { padding: [50, 50] });
        }
      } catch (error) {
        // Esto puede pasar si solo hay un marcador, es seguro ignorarlo.
      }
    }
  }
}
