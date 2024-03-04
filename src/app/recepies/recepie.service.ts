import { EventEmitter, Injectable } from '@angular/core';
import { Recepie } from './recepie.model';
import { Ingrident } from '../shared/ingrident.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecepieService {

  onRecepieChanged = new Subject<Recepie[]>()
  onClickedRecepie = new EventEmitter<Recepie>()

  constructor() { }

  // private recepies:Recepie[]=[
  //   new Recepie("pizza","Delicious","https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?size=626&ext=jpg",
  //   [
  //     new Ingrident('pizza base',1),
  //     new Ingrident('vegies',5),
  //   ]),
  //   new Recepie("burger","Spunchy","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPW4lc1FswFDGb5C-C_29pXmbig1Vq5ufZ8TUdpdnBTA&s",
  //   [
  //     new Ingrident('buns',2),
  //     new Ingrident('sauces',3),
  //   ])
  // ]
  private recepies:Recepie[]=[]
  getRecepie(){
    return this.recepies.slice()
  }
  onFetchRecepie(recepies:Recepie[]){
    this.recepies = recepies
    this.onRecepieChanged.next(this.recepies.slice())
  }
  overrideRecepies(overridenRecepies:Recepie[]){
    this.recepies = overridenRecepies
    this.onRecepieChanged.next(this.recepies.slice())
  }
  getSingleRecepie(index:number){
    return this.recepies[index]
  }
  updateRecepie(index:number,newRecepie:Recepie){
    this.recepies[index] = newRecepie
    this.onRecepieChanged.next(this.recepies.slice())
  }
  newRecepie(recepie:Recepie){
    this.recepies.push(recepie)
    this.onRecepieChanged.next(this.recepies.slice())
  }
  DeleteRecepie(index:number){
    this.recepies.splice(index,1)
    this.onRecepieChanged.next(this.recepies.slice())
  }
  
}
