import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../components/interfaces/heroe.interface';
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

  heroesUrl:string = 'https://heroes-app-58a11.firebaseio.com/heroes.json';
  heroeUrl:string = 'https://heroes-app-58a11.firebaseio.com/heroes';

  constructor(private http:Http) { 

  }

  nuevoHeroe( heroe:Heroe ){
    let body = JSON.stringify( heroe );
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.post(this.heroesUrl, body, { headers })
            .map(response => {
              console.log(response.json());
              return response.json()
            });
  }
  actualizarHeroe( heroe:Heroe, key:string ){
    let body = JSON.stringify( heroe );
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let url = `${ this.heroeUrl }/${ key }.json`;

    return this.http.put( url, body, { headers })
            .map(response => {
              console.log(response.json());
              return response.json()
            });
  }

}
