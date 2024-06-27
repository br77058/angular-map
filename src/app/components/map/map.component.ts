/**
 * This component represents a map with interactive paths. When a path is clicked,
 * it fetches and displays country information from the World Bank API.
 */
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LabelComponent } from '../label/label.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../country.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HeaderComponent, LabelComponent, MatIconModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  // Variables to store country information
  countryName: string = '';
  region: string = '';
  incomeLevel: string = '';
  longitude: string = '';
  latitude: string = '';

  constructor(
    private countryService: CountryService, // Inject CountryService
    private matIconRegistry: MatIconRegistry, // Inject MatIconRegistry directly (not using inject)
    private domSanitizer: DomSanitizer, // Inject DomSanitizer directly (not using inject)
    private http: HttpClient // Inject HttpClient directly (not using inject)
  ) {
    // Registering the SVG icon for the map
    this.matIconRegistry.addSvgIcon(
      'map_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/images/map-image.svg'
      )
    );
  }

  /**
   * Handles the hover event on a path element.
   * Changes the fill color of the path to indicate hover state.
   */
  onPathHover(event: MouseEvent) {
    const target = event.target as SVGElement;
    if (target && target.nodeName === 'path') {
      target.style.fill = 'blue';
    }
  }

  /**
   * Handles the mouse leave event on a path element.
   * Resets the fill color of the path to its original state.
   */
  onPathLeave(event: MouseEvent) {
    const target = event.target as SVGElement;
    if (target && target.nodeName === 'path') {
      target.style.fill = 'white';
    }
  }

  /**
   * Handles the click event on a path element.
   * Fetches country information from the World Bank API based on the path's ID.
   */
  onPathClick(event: MouseEvent) {
    const target = event.target as SVGElement;
    if (target && target.nodeName === 'path') {
      const countryName = target.id;

      // Fetching country information using CountryService
      this.countryService.getCountryInfo(countryName).subscribe(
        (response: any) => {
          // Check if the response is an array and has the expected structure
          if (
            Array.isArray(response) &&
            response.length > 1 &&
            Array.isArray(response[1]) &&
            response[1].length > 0
          ) {
            const countryData = response[1][0];
            // Updating the component's state with the fetched data
            this.countryName = countryData.name;
            this.region = countryData.region.value;
            this.incomeLevel = countryData.incomeLevel.value;
            this.longitude = countryData.longitude;
            this.latitude = countryData.latitude;
          } else {
            console.warn('Unexpected API response structure:', response);
          }
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    }
  }
}
