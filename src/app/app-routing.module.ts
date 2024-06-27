import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component'; // Import the HeaderComponent

const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' }, // Default route
  { path: 'map', component: MapComponent }, // Map route
  { path: 'bingus', component: HeaderComponent }, // Test route for '/bingus'
  { path: '**', redirectTo: '/map' }, // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
