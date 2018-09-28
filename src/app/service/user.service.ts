import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { CMS_URL } from './url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../domain/user";
import { UserRequest } from "../domain/user.request";


@Injectable()
export class UserService {
    constructor(private http: Http,
        private httpc: HttpClient) { }

        getUser(User :UserRequest){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(User);

            return this.httpc.post<User>(CMS_URL + '/userdata/getuserData',body);
        }

}
