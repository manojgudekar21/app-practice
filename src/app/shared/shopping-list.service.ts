import { Injectable } from '@angular/core';
import { Ingrident } from './ingrident.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingridentsChanged = new Subject<Ingrident[]>()
  onEditing = new Subject<number>()

  constructor() { }

  private ingridents:Ingrident[]=[
    new Ingrident("mango",55),
    new Ingrident("apple",66),
  ]
  getIngrident(){
    return this.ingridents.slice()
  }
  receviedData(ingrident:Ingrident[]){
    this.ingridents.push(...ingrident)
    this.ingridentsChanged.next(this.ingridents.slice())
  }
  getIngridentAccordingIndex(index:number){
   return this.ingridents[index]
  }
  addIngrident(ingrident:Ingrident){
    this.ingridents.push(ingrident)
    this.ingridentsChanged.next(this.ingridents.slice())
  }
  
  onUpdataIngrident(index:number,newIngrident:Ingrident){
    this.ingridents[index] = newIngrident
    this.ingridentsChanged.next(this.ingridents)
  }

  onDeleteIngrident(index:number){
    this.ingridents.splice(index,1)
    this.ingridentsChanged.next(this.ingridents.slice())
  }

}
