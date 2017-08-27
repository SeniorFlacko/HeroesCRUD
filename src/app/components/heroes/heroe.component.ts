import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe:Heroe = {
    nombre:'',
    bio:'',
    casa:'Marvel' 
  }
  id:string;
  constructor(  private _heroesService: HeroesService, 
                private _router: Router,
                private _route: ActivatedRoute ) { 

    this._route.params.subscribe(parametros => this.id = parametros['id']);

    if( this.id != "nuevo" ){
      this._heroesService.getHeroe( this.id ).subscribe( heroe => this.heroe = heroe )
    }
  
  }

  ngOnInit() {
  }

  guardar(){
    console.log( this.heroe );

    if( this.id === "nuevo" ){
      this._heroesService.nuevoHeroe( this.heroe )
            .subscribe( data => {
              this._router.navigate(['/heroes',data.name]);
            },
            error => console.log(error));
    }
    else{
      this._heroesService.actualizarHeroe( this.heroe, this.id )
            .subscribe( data => {
              console.log(data);
            },
            error => console.log(error));
    }
  }


  agregarNuevo( forma: NgForm ){
    forma.reset( {
      casa: "Marvel"
    });
  }

}
