import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RecepiesStorageService } from '../shared/recepies-storage.service';
import { RecepieService } from '../recepies/recepie.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  subscription:Subscription;
  isLoggedIn = false
  constructor(private recepiesStorageService:RecepiesStorageService,private recepiesService:RecepieService,private authService:AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe((user)=>{
      this.isLoggedIn = user? true:false
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSaveData(){
    this.recepiesStorageService.onSaveRecepies()
  }

  onFetchData(){
    this.recepiesStorageService.onFetchRecepies().subscribe()
  }
  onLogout(){
    this.authService.logout()
  }

  
}
