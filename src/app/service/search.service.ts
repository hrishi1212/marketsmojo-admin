import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { CMS_URL } from './url.service';
import { FRONTEND_URL } from './url.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Search } from "../domain/search";
import { SearchRequest } from "../domain/search.request";


@Injectable()
export class SearchService {
    constructor(private http: Http,
        private httpc: HttpClient) { }

        getSearch(SearchRequest :SearchRequest){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(SearchRequest);
            return this.httpc.post<Search>(CMS_URL + '/News/stockSearch',body);
        }

        getSearchID(id){
            return this.httpc.get<Search>(`http://marketmojo.com/portfolio-plus/frontendsearch?SearchPhrase=${id}`);
        }

        // getSearchID(id){
        //     return this.httpc.get<Search>( `${FRONTEND_URL}portfolio-plus/frontendsearch?SearchPhrase=${id}`);
        // }
}
