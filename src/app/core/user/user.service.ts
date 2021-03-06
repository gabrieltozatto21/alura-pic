import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { TokenService } from "../token/token.service";
import { User } from "./user";
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class UserService {
    private userSubject = new BehaviorSubject<User>({});
    private userName: string = ''

    constructor(private tokenService: TokenService){
        this.tokenService.hasToken() &&
            this.decodeAndNotify();
    }

    setToken(token: string){
        this.tokenService.setToken(token)
        this.decodeAndNotify();
    }

    getUser(){
        return this.userSubject.asObservable();
    }

    getUserName(){
        return this.userName;
    }

    private decodeAndNotify(){
        const token = this.tokenService.getToken();
        if(token){
            const user = jwt_decode(token) as User
            this.userName = user.name ?? ''
            this.userSubject.next(user);
        }
    }

    logout(){
        this.tokenService.removeToken();
        this.userSubject.next({})
    }

    isLogged(){
        return this.tokenService.hasToken();
    }
}