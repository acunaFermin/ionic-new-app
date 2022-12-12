import { Pipe, PipeTransform } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';

export interface ParPeliculas {
  par: Pelicula,
  impar: Pelicula,
}

@Pipe({
  name: 'pares'
})
export class ParesPipe implements PipeTransform {

  transform(peliculas: Pelicula[], ...args: unknown[]): ParPeliculas[] {

    if(!peliculas.length) return [];
    
    let paresPeliculas: ParPeliculas[] = [];

    let i = 0;
    for( let peli in peliculas ){

      if(!peliculas[i]) break;
   
      paresPeliculas = [ ...paresPeliculas, 
        {
          impar: peliculas[ i ],
          par: peliculas[i + 1] || null,
        }
      ];

      i =  i + 2;
    }

    return paresPeliculas;
  }

}
