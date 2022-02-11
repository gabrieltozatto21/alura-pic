import { Injectable, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Alert, AlertType } from "./alert";

@Injectable({ providedIn: 'root' })
export class AlertService implements OnInit{
  
    alertSubject: Subject<Alert>  = new Subject<Alert>();
    keepAfterChenge: boolean = false;
    
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events
            .subscribe(event => {
                if(event instanceof NavigationStart){
                    if(this.keepAfterChenge){
                        this.keepAfterChenge = false
                    }else{
                        this.clear();
                    }
                }
            })
    }

    sucess(message: string, keepAfterChenge: boolean = false){
        this.alert(AlertType.SUCCESS, message, keepAfterChenge)
    }
    warning(message: string, keepAfterChenge: boolean = false){
        this.alert(AlertType.WARNING, message, keepAfterChenge)
    }
    danger(message: string, keepAfterChenge: boolean = false){
        this.alert(AlertType.DANGER, message, keepAfterChenge)
    }
    info(message: string, keepAfterChenge: boolean = false){
        this.alert(AlertType.INFO, message, keepAfterChenge)
    }

    private alert(alertType: AlertType, message: string, keepAfterChenge: boolean = false){
        this.keepAfterChenge = keepAfterChenge;
        
        this.alertSubject.next(new Alert(alertType, message))
    }

    getAlert(){
        return this.alertSubject.asObservable();
    }

    clear(){
        this.alertSubject.next(new Alert());
        
    }
}