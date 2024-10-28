import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component'; // Importa el componente

@NgModule({
  declarations: [FooterComponent],  // Declara el FooterComponent
  exports: [FooterComponent],       // Exporta para usarlo en otros módulos
  imports: [CommonModule]            // Importa CommonModule para funcionalidad básica de Angular
})
export class FooterModule {}
