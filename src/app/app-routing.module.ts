// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' }, // Redirige la ruta principal a 'products'
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent }, // Ruta para el detalle de producto
  { path: '**', redirectTo: 'products' } // Ruta fallback
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}