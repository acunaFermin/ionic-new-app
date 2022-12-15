import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, DetallePelicula } from 'src/app/interfaces/interfaces';
import { MovieService } from 'src/app/services/movie.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id:number = 0;

  pelicula!: DetallePelicula;
  actores: Cast[] = [];
  texto:number = 150;
  favoritos = false;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -15
  }

  constructor( 
    private movieService: MovieService,
    private modalCtrl: ModalController ,
    private storageService: StorageService
  ) { }

  get peliculasFavoritas() {
    return [ ...this.storageService.peliculas ]
  }

  ngOnInit() {

    this.movieService.getPeliculaDetalle( this.id )
    .subscribe(resp => {
      
      this.pelicula = resp;
      this.favoritos = !!this.peliculasFavoritas.find( peli => peli.id === this.pelicula.id );

    })
    
    this.movieService.getActoresPelicula( this.id )
    .subscribe(resp => {
      console.log(resp)
      this.actores = [ ...resp.cast ]
    })
    
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    this.favoritos = !this.favoritos;
    this.storageService.guardarPelicula( this.pelicula );
  }

}
