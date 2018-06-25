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
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');        
        var body = JSON.stringify(loginRequest);

        return this.httpc.post<LoginRequest>(LOGIN_REST_URL + 'authenticate/0', body);
    }


    


}
