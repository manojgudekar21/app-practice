import { Component, OnInit } from '@angular/core';
import { RecepieService } from './recepie.service';
import { Recepie } from './recepie.model';

@Component({
  selector: 'app-recepies',
  templateUrl: './recepies.component.html',
  styleUrls: ['./recepies.component.css']
})
export class RecepiesComponent implements OnInit {

  constructor(private recepieService:RecepieService) { }

  onClickedRecepie:Recepie;
  ngOnInit(): void {
    this.recepieService.onClickedRecepie.subscribe((recepie:Recepie)=>{
      this.onClickedRecepie = recepie
    })
  }

}
