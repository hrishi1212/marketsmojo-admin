import { Injectable } from "@angular/core";
import { LoginRequest } from "../domain/login.request";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { LOGIN_REST_URL } from './url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class LoginService {

    private user;
    constructor(private http: Http,
        private httpc: HttpClient) { }

    Login(loginRequest: LoginRequest) {
        return this.http.post(LOGIN_REST_URL + 'authenticate/0', loginRequest).map((response: Response) => {
            if (response.json().code == 200 && response.json().message == "success") {
                localStorage.setItem("login", 'true');
                return response.json().data
            }else if(response.json().code == 200 && response.json().message !== "success"){
                return response.json().data
            }
        }
        )
    }


    


}
