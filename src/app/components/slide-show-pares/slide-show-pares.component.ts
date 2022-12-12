import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slide-show-pares',
  templateUrl: './slide-show-pares.component.html',
  styleUrls: ['./slide-show-pares.component.scss'],
})
export class SlideShowParesComponent implements OnInit {

  @Input() slidesOpts = {
    slidesPerView: 3.27,
    freeMode: true,
  };

  @Input() peliculasRecientes: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async verDetalle( id:number ){

    const modal = await this.modalCtrl.create({
      component:DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }

  onClick(){

    this.cargarMas.emit();

  }

}
