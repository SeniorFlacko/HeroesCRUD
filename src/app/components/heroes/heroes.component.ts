import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  
  heroes:any[] = [];
  loading: boolean = true;
  constructor(private _heroesService: HeroesService) {
      this._heroesService.getHeroes().subscribe( data => { 
        setTimeout( () => {
          this.loading = false;
          this.heroes=data 
          console.log(data);
        }, 3000);
    });
   }

  ngOnInit() {
  }

  borrarHeroe( key:string ){
    this._heroesService.deleteHeroe( key ).subscribe( respuesta => {
      if( respuesta ){
        console.error( respuesta )
      }
      else{
        console.log( respuesta )
        delete this.heroes[key];
      }
      
    });
  }

}
