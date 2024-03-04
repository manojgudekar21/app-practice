import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecepieService } from '../recepies/recepie.service';
import { Recepie } from '../recepies/recepie.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecepiesStorageService {

  constructor(private http:HttpClient,private recepiesService:RecepieService, private authService:AuthService) { }

  onSaveRecepies(){
    const recepies = this.recepiesService.getRecepie()
    this.http.put('https://recepies-storage-default-rtdb.firebaseio.com/posts.json',recepies)
    .subscribe((recepies)=>{
      console.log(recepies)
    })
  }

  onFetchRecepies(){
    return this.authService.user.pipe(take(1),exhaustMap(user=>{
      return this.http.get<Recepie[]>('https://recepies-storage-default-rtdb.firebaseio.com/posts.json',
      {
        params: new HttpParams().set('auth',user.token)
      })

    }),map(recepies=>{
      return recepies.map(recepie=>{
        return {...recepie,ingridents:recepie.ingridents? recepie.ingridents : []}
      })
    }),tap(recepies=>{
      this.recepiesService.overrideRecepies(recepies)
    }))
    
  }
}
