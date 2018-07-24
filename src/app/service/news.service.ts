import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { CMS_URL } from './url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewsPage } from "../domain/newspage";
import { NewsRequest } from "../domain/news.request";
import { News } from "../domain/news";
import { SetTopNews } from "../domain/settopnews.request";
import { AddNews } from "../domain/addnews.request";


@Injectable()
export class NewsService {
    constructor(private http: Http,
        private httpc: HttpClient) { }

        getNewsPage(NewsPage :NewsPage){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(NewsPage);

            return this.httpc.post<News>(CMS_URL + '/News/listnews',body);
        }

        getNewsPageTop(NewsPage :NewsPage){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(NewsPage);

            return this.httpc.post<News>(CMS_URL + '/News/getTopNews',body);
        }


        updateNews(NewsRequest:NewsRequest){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(NewsRequest);

            return this.httpc.post<NewsRequest>(CMS_URL + '/News/deleteNews ',body);
        }

        setTopNews(SetTopNews:SetTopNews){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let topnews  = new Array();
            topnews.push(SetTopNews);        
            var body = JSON.stringify(topnews);

            return this.httpc.post<SetTopNews>(CMS_URL + '/News/setTopNews ',body);
        }

        addNews(AddNews:AddNews){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(AddNews);

            return this.httpc.post<AddNews>(CMS_URL + '/News/manageNews ',body);
        }
}
