import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs"
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface responseData {
    idToken: string,
    email: string,
    refershToken: string,
    expiresIn: string,
    localId: string,
    registered?: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private destroyExpirationDate: any;

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<responseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApXIqRBX_VlPa_h4V9uXpuf1koBCu_La0',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.errorHandle), tap(responseData => {
            this.UserHandle(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
        }))
    }

    autoLogin() {
        const userdata: {
            email: string,
            localId: string,
            _tokenId: string,
            _expirationDate: string
        } = JSON.parse(localStorage.getItem('userdata'))
        if (!userdata) {
            return;
        }
        const loadedUser = new User(userdata.email,
            userdata.localId,
            userdata._tokenId,
            new Date(userdata._expirationDate))
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDate = new Date(userdata._expirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationDate)
        }
    }

    login(email: string, password: string) {
        return this.http.post<responseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApXIqRBX_VlPa_h4V9uXpuf1koBCu_La0',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.errorHandle), tap(responseData => {
            this.UserHandle(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
        }))
    }

    logout() {
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userdata')
        clearTimeout(this.destroyExpirationDate)
    }
    
    autoLogout(expirationDate: number) {
        console.log(expirationDate)
        this.destroyExpirationDate = setTimeout(() => {
            this.logout()
        }, expirationDate)
    }

    private UserHandle(email: string, localId: string, tokenId: string, expiresIn: number) {
        const expiration = new Date(new Date().getTime() + +expiresIn * 1000)
        const user = new User(email, localId, tokenId, expiration)
        this.user.next(user)
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userdata', JSON.stringify(user));

    }

    private errorHandle(errorRes: HttpErrorResponse) {
        let error = 'error is not recognised'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(error)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                error = 'same email exists'
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                error = 'email or password is incorrect'
                break;
            case 'EMAIL_NOT_FOUND':
                error = 'email not found'
                break;
            case 'INVALID_PASSWORD:':
                error = 'password is incorrect'
                break;
        }
        return throwError(error)
    }

}