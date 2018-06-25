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
     loginLabel = "Log In";
     usernameError : string;
     passwordError : string;
    private password: string;
    constructor(
        private router: Router,
        private _login: LoginService) { }
    ngOnInit() {}

    
    checklogin() {
        this.loginLabel = "WAIT...";
        this._login.Login(this.loginRequest).subscribe(
            (data: any) => {
                this.user = data.data;
                this.loginLabel = "Log In";
                if (data.data.userid) {
                    localStorage.setItem("login", "true");
                    localStorage.setItem("userid", data.data.userid);
                    localStorage.setItem("name", data.data.display_name);
                    localStorage.setItem("image", data.data.image);
                    localStorage.setItem("login_id", data.data.login_id);
                    this.router.navigate(["/pages/dashboard"]);
                }else{
                    this.usernameError = data.data.username;
                    this.passwordError = data.data.password;
                }
            })

    }
}
