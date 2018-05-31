import { Injectable } from "@angular/core";
import { LoginRequest } from "../domain/login.request";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { LOGIN_REST_URL } from './url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../domain/user";


@Injectable()
export class LoginService {

    private user;
    constructor(private http: Http,
        private httpc: HttpClient) { }

    Login(loginRequest: LoginRequest) {
        return this.http.post(LOGIN_REST_URL + 'authenticate/0', loginRequest).map((response: Response) => {
            if (response.json().code == 200) {
                localStorage.setItem("login", 'true');
                this.user = response.json().data;
                return response.json().data
            }
        }
        )
    }

    getuserDetails(){
        return this.http.get(LOGIN_REST_URL + 'checklogin/0').map((response: Response) => {
            if (response.json().code == 200) {
                return response.json().data
            }
        }
        )
    }
    


}
