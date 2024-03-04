import { Component, Input, OnInit } from '@angular/core';
import { Recepie } from '../recepie.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecepieService } from '../recepie.service';

@Component({
  selector: 'app-recepie-details',
  templateUrl: './recepie-details.component.html',
  styleUrls: ['./recepie-details.component.css']
})
export class RecepieDetailsComponent implements OnInit {

  id:number;
  @Input() clickedRecepie:Recepie;
  constructor(private recepieService:RecepieService,
    private slService:ShoppingListService,private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id']
      this.clickedRecepie=this.recepieService.getSingleRecepie(this.id)
    })
  }
  sendData(){
    this.slService.receviedData(this.clickedRecepie.ingridents)
  }
  onEdit(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }
  onDelete(){
    this.recepieService.DeleteRecepie(this.id)
    this.router.navigate(['/recepies'])
  }

}
