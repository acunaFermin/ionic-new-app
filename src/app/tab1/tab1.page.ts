import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  slidesOpts = {
    slidesPerView: 1.1,
    freeMode: true
  }

  constructor( private movieService: MovieService ) {}


  ngOnInit(): void {

    this.movieService.getFeature().subscribe(resp => {
      this.peliculasRecientes = [ ...resp.results];
    });


    this.getPopulares();

  }


  cargarMas(){
    this.getPopulares();
  }


  getPopulares(){
    this.movieService.getPopulares().subscribe( resp => {
      this.populares = [ ...this.populares, ...resp.results];
    })
  }

}
