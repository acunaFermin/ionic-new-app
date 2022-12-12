import { Component, Input, OnInit } from '@angular/core';
import { DetallePelicula } from 'src/app/interfaces/interfaces';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id:number = 0;

  pelicula!: DetallePelicula;
  texto:number = 150;

  constructor( private movieService: MovieService ) { }

  ngOnInit() {

    this.movieService.getPeliculaDetalle( this.id )
    .subscribe(resp => {
      this.pelicula = resp;
    })
    
    this.movieService.getActoresPelicula( this.id )
    .subscribe(resp => {
      console.log(resp)
    })
    
  }

}
