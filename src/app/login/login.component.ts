import { Component } from '@angular/core';
import { LoginRequest } from '../domain/login.request';
import { LoginService } from '../service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { User } from "../domain/user";

@Component({
    selector: 'login-root',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html',
    providers: [LoginService]
})
export class LoginComponent {
    loginRequest: LoginRequest = new LoginRequest();
    user: User = new User();
    private username: string;
    private password: string;
    constructor(
        private router: Router,
        private _login: LoginService) { }
    ngOnInit() {

    }
    savelogin() {
        this._login.Login(this.loginRequest).subscribe(
            (data: any) => {
                this.user = data;
                if (this.user) {
                    this.router.navigate(["/pages/dashboard"]);
                }
            })

    }
}
