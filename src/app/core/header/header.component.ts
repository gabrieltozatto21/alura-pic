import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../user/user";
import { UserService } from "../user/user.service";

@Component({
    selector:'app-header',
    templateUrl : './header.component.html'
})
export class HeaderComponent implements OnInit{
    user$!: Observable<User>;
    user!: User

    constructor(private userService: UserService){}
    
    ngOnInit(): void {
        this.user$ = this.userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }
}