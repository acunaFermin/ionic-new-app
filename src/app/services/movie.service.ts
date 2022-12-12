import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DetalleActores, DetallePelicula, Pelicula, RespuestaMovieDB } from '../interfaces/interfaces';


const { url, api_key } = environment;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private popularesPage:number = 0;

  constructor( private http : HttpClient ) { 

  }

  private ejecutarQuery<T>( query:string ){

    query = url + query;
    query += `&api_key=${ api_key }&language=es&include_image_language=es`;

    return this.http.get<T>( query );
  }


  getFeature(){

    const hoy = new Date();

    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;

    if( mes < 10 ){
      mesString = '0' + mes;
    }else{
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin    = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery< RespuestaMovieDB >(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`)
  }


  getPopulares(){

    this.popularesPage ++;


    return this.ejecutarQuery< RespuestaMovieDB >( `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}` )
  }


  getPeliculaDetalle( id:number ){

    return this.ejecutarQuery< DetallePelicula >( `/movie/${ id }?a=1` );

  }
  
  
  getActoresPelicula( id:number ){

    return this.ejecutarQuery< DetalleActores >( `/movie/${ id }/credits?a=1` );

  }
}
