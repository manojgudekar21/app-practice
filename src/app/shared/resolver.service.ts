import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recepie } from '../recepies/recepie.model';
import { RecepiesStorageService } from './recepies-storage.service';
import { RecepieService } from '../recepies/recepie.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<Recepie[]>{

  constructor(private recepiesStorageService:RecepiesStorageService,private recepiesService:RecepieService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recepies = this.recepiesService.getRecepie()
    if(recepies.length===0){
      return this.recepiesStorageService.onFetchRecepies()
    }else{
      return recepies
    }
  }
}
