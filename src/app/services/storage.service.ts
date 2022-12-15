import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DetallePelicula } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  private _storage: Storage | null = null;
  private _peliculas: DetallePelicula[] = [];

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.init();
  }

  get peliculas(){
    return [ ...this._peliculas ]
  }

  async showToast( mensaje: string ) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }


  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarPelicula( pelicula:DetallePelicula ){
    
    let existe:boolean = !!this._peliculas.find( peli => peli.id === pelicula.id );

    if( existe ){
      
      console.log('La pelicula ya existe, ha sido removida de favoritos')
      this._peliculas = this._peliculas.filter( peli => peli.id !== pelicula.id);
      
    }else{
      
      console.log('pelicula agregada a favoritos')
      this._peliculas = [  {...pelicula }, ...this._peliculas ];
      
    }


    this._storage?.set('peliculas', this._peliculas)
    .then( resp =>  {
      let mensaje = existe? 'Removido de favoritos' : 'Agregado a favoritos';
      this.showToast( mensaje );
    })
    .catch(err => console.log(err))
    
  };

}
