import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideShowParesComponent } from './slide-show-pares/slide-show-pares.component';
import { DetalleComponent } from './detalle/detalle.component';

const components = [
  SlideshowBackdropComponent,
  SlideshowPosterComponent,
  SlideShowParesComponent,
  DetalleComponent
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
