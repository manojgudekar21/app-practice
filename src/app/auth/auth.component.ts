import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, responseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {                        

  isLoginmode=true
  isLoading=false
  error:string = null

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  inSwitchMode(){
    this.isLoginmode = !this.isLoginmode
  }

  onSubmit(authform:NgForm){
    if(authform.invalid){
      return
    }
    const email = authform.value.email
    const password = authform.value.password

    this.isLoading=true
    let authobs:Observable<responseData>;

    if(this.isLoginmode){
      authobs = this.authService.login(email,password)
    }else{
      authobs = this.authService.signup(email,password)
    }
    
    authobs.subscribe((responseData)=>{
      console.log(responseData)
      this.isLoading = false
      this.router.navigate(['/recepies'])
    },(error)=>{
      console.log(error)
      this.error = error
      this.isLoading = false
    })

    authform.reset()
  }

  

}
