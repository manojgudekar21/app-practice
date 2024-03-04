import { Component, OnInit } from '@angular/core';
import { Ingrident } from '../shared/ingrident.model';
import { ShoppingListService } from '../shared/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(private slService:ShoppingListService) { }

  ingridents:Ingrident[]=[]

  ngOnInit(): void {
    this.ingridents = this.slService.getIngrident()
    this.slService.ingridentsChanged.subscribe((ingridents:Ingrident[])=>{
      this.ingridents = ingridents
    })
  }

  onEditItem(index:number){
    this.slService.onEditing.next(index)
  }


}
