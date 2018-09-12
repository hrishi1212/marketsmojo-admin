import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { CMS_URL } from './url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewsPage } from "../domain/newspage";
import { NewsRequest } from "../domain/news.request";
import { News } from "../domain/news";
import { SetTopNews } from "../domain/settopnews.request";
import { AddNews } from "../domain/addnews.request";
import { AddMojoNews } from "../domain/addmojonews.request";


@Injectable()
export class MojoNewsService {

    constructor(private http: Http,private httpc: HttpClient) {

    }
    getNewsPage(NewsPage :NewsPage){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(NewsPage);

        return this.httpc.post<News>(CMS_URL + '/News_Mojonews/listnews',body);
    }

    getNewsPageTop(NewsPage :NewsPage){
        alert("service");
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(NewsPage);

        return this.httpc.post<News>(CMS_URL + '/News_Mojonews/getTopNews',body);
    }


    updateNews(NewsRequest:NewsRequest,_file:File){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(NewsRequest);
        // console.log(body);return false;
        const formData: FormData = new FormData();
        formData.append('params', body);
        if(_file.name) {
            formData.append('source_img', _file, _file.name);
        }

        return this.httpc.post(CMS_URL + '/News_Mojonews/manageNews ',formData);
    }
    deleteNews(NewsRequest:NewsRequest){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(NewsRequest);
        // console.log(body);//return true;
        return this.httpc.post<NewsRequest>(CMS_URL + '/News_Mojonews/deleteNews ',body);
    }
    setTopNews(SetTopNews:SetTopNews){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let topnews  = new Array();
        topnews.push(SetTopNews);
        var body = JSON.stringify(topnews);

        return this.httpc.post<SetTopNews>(CMS_URL + '/News_Mojonews/setTopNews ',body);
    }

    addNews(AddMojoNews:AddMojoNews,_file:File){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(AddMojoNews);
        const formData: FormData = new FormData();
        formData.append('params', body);
        if(_file.name) {
            formData.append('source_img', _file, _file.name);
        }
        return this.httpc.post(CMS_URL + '/News_Mojonews/manageNews ',formData);
    }
    getNewsDetail(NewsRequest:NewsRequest){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(NewsRequest);
        return this.httpc.post<NewsRequest>(CMS_URL + '/News_Mojonews/listNews ',body);
    }
}
