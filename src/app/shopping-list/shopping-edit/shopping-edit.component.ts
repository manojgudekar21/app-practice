import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingrident } from 'src/app/shared/ingrident.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  
  subscription :Subscription;

  @ViewChild('f') formdata:NgForm;

  constructor(private slService:ShoppingListService) { }

  editMode=false
  editeditemindex:number;
  edditedIngrident:Ingrident;

  ngOnInit(): void {
    this.subscription = this.slService.onEditing.subscribe((index:number)=>{
      this.editeditemindex=index
      this.editMode=true
      this.edditedIngrident = this.slService.getIngridentAccordingIndex(index)
      this.formdata.setValue({
        name:this.edditedIngrident.name,
        amount:this.edditedIngrident.amount
      })
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit(form:NgForm){
    const value = form.value
    const NewIngrident = new Ingrident(value.name,value.amount)
    if(this.editMode){
      this.slService.onUpdataIngrident(this.editeditemindex,NewIngrident)
    }else{
      this.slService.addIngrident(NewIngrident)
    }
    this.editMode=false
    this.formdata.reset()
  }
  onClear(){
    this.formdata.reset()
    this.editMode = false
  }

  OnDelete(){
    this.slService.onDeleteIngrident(this.editeditemindex)
    this.onClear()
  }

}
