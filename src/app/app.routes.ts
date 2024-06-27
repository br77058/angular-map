import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';

export const routeConfig: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' }, // Default route
  { path: 'map', component: MapComponent }, // Map route
  { path: '**', redirectTo: '/map' }, // Wildcard route
];
