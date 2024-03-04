import { Component, OnInit } from '@angular/core';
import { Recepie } from '../recepie.model';
import { RecepieService } from '../recepie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recepie-list',
  templateUrl: './recepie-list.component.html',
  styleUrls: ['./recepie-list.component.css']
})
export class RecepieListComponent implements OnInit {

  constructor(private recepieService:RecepieService,private router:Router,private route:ActivatedRoute) { }

  recepies:Recepie[]=[]

  ngOnInit(): void {
    this.recepies = this.recepieService.getRecepie()
    this.recepieService.onRecepieChanged.subscribe((recepies:Recepie[])=>{
      this.recepies = recepies
    })
  }
  toNew(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }

}
