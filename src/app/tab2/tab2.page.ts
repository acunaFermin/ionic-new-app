import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { dematerialize } from 'rxjs';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ResultBusqueda } from '../interfaces/interfaces';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar:string = 'Buscar...';
  sugerencias: string[] = ['el señor de los anillos','el hobbit','harry potter','esperando la carroza']

  peliculas: ResultBusqueda[] = [];

  showSpiner = false;

  constructor(
    private movieService:MovieService,
    private modalCtrl: ModalController
  ) {}

  buscar(event:any){
    if( (event.detail.value as string).length === 0 ){
      this.peliculas = [];
      this.showSpiner = false;
      return;
    }

    this.showSpiner = true;

    setTimeout(() => {
      this.movieService.buscarPelicula( event.detail.value ).subscribe( resp => { 
        this.peliculas = resp.results;
        this.showSpiner = false;
      })
    }, 500);
  };

  async verDetalle( id:number ){

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id,
      }
    });

    modal.present();

  }

}
