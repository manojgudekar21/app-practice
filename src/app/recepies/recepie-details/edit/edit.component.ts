import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecepieService } from '../../recepie.service';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id:number;
  editMode=false
  formdata:FormGroup;
  constructor(private route:ActivatedRoute,private recepieService:RecepieService, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id']
      this.editMode = params['id'] != null;
      // console.log(this.editMode)
    })
    this.initform()
  }

  initform(){
    let recepieName=''
    let recepieURL=''
    let recepieDisc=''
    let recepieIngridents=new FormArray([])
    if(this.editMode){
      let recepie = this.recepieService.getSingleRecepie(this.id)
      recepieName= recepie.name;
      recepieURL= recepie.imagePath
      recepieDisc=recepie.discription
      if(recepie['ingridents']){
        for(let ingrident of recepie.ingridents){
          recepieIngridents.push(
            new FormGroup({
              'name': new FormControl(ingrident.name,Validators.required),
              'amount': new FormControl(ingrident.amount,[Validators.required,Validators.pattern(/^[0-9]+[1-9]*$/)])
            })
          )
        }
      }
    }
    this.formdata = new FormGroup({
      'name': new FormControl(recepieName,Validators.required),
      'imagePath': new FormControl(recepieURL,Validators.required),
      'discription': new FormControl(recepieDisc,Validators.required),
      'ingridents':recepieIngridents
    })
  }

  addIngrident(){
    (<FormArray>this.formdata.get('ingridents')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+[1-9]*$/)])
      })
    )
  }
  removeIngrident(index:number){
    (<FormArray>this.formdata.get('ingridents')).removeAt(index)
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  onSubmit(){
    // console.log(this.formdata.value)
    if(this.editMode){
      this.recepieService.updateRecepie(this.id,this.formdata.value)
    }else{
      this.recepieService.newRecepie(this.formdata.value)
    }
    this.formdata.reset()
    this.router.navigate(['../../'])
  }

}
