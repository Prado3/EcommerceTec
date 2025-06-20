import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CoreRoutingModule 
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
