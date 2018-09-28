import { Component, Input,Output, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";
import { TreeModel } from 'ng2-tree';
import { NewsPage } from "../../../domain/newspage";
import { NewsRequest } from "../../../domain/news.request";
import { News } from "../../../domain/news";
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { NewsService } from "../../../service/news.service";
import { MojoNewsService } from "../../../service/mojonews.service";
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Search } from "../../../domain/search";
import { SearchService } from "../../../service/search.service";
import { SearchRequest } from "../../../domain/search.request";
import { AnimationGroupPlayer } from '@angular/animations/src/players/animation_group_player';
import { PanelModule } from 'primeng/panel';
import { SetTopNews } from "../../../domain/settopnews.request";
import { AddNews } from "../../../domain/addnews.request";
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'ngx-tree',
    templateUrl: './mojo-news.component.html',
    providers: [MojoNewsService, SearchService]
})
export class MojoNewsComponent {

    constructor(private router: Router,private _news: MojoNewsService,private _search: SearchService) {
    }

    @Input() suggestions: string;

    loading: boolean;
    totalRecords: number;
    totalRecordsTop: number;

    news: News = new News();
    newsRequest: NewsRequest = new NewsRequest();
    newspage: NewsPage = new NewsPage();
    searchrequest: SearchRequest = new SearchRequest();
    settopnews: SetTopNews = new SetTopNews();

    newsArray: News[];
    newsArrayTop: News[];
    headersCol: any[];
    headersColTop: any[];
    selectedNews: News;
    newsNew: News;
    displayDialog: boolean;
    Company: string;
    results: any[];
    searchString = [];
    NewsDrop: SelectItem[];
    TopDrop: SelectItem[];
    message: string;
    messageTop: string;
    mapStocks: any[] = [];
    mapStockId : any[] = [];

    ngOnInit() {
        this.NewsDrop = [
            { label: 'News Type', value: null },
            { label: 'Stock News', value: 'STKNWS' },
            { label: 'Domestic News', value: 'DSKNWS' },
            { label: 'International News', value: 'INTNWS' },
        ];
        this.TopDrop = [
            { label: 'Top News', value: null },
            { label: 'TOP', value: 1 },
            { label: 'OTHER', value: 0 }

        ];
    }

    getNewsPage() {
        this.loading = true;
        this._news.getNewsPage(this.newspage).subscribe(
            (data: any) => {

                if (data.code == "200") {

                    this.newsArray = data.data.results;
                    this.totalRecords = data.data.total;
                    this.headersCol = [
                        { field: 'title', header: 'Title', Style: { width: '200px', 'text-align': 'center' }, width: '500' },
                        { field: 'newstype', header: 'News Type', Style: { width: '100%', 'text-align': 'center' }, width: '100' },
                        { field: 'publisheddate', header: 'Published Date', Style: { width: '200px', 'text-align': 'center' }, width: '150' }

                    ];

                    this.loading = false;
                } else {
                    this.loading = false;
                    this.message = data.message;
                }
            }
        )
    }


    getNewsPageTop() {
        alert("component");
        this.loading = true;
        this._news.getNewsPageTop(this.newspage).subscribe(
            (data: any) => {

                if (data.code == "200") {

                    this.newsArrayTop = data.data.results;
                    this.totalRecordsTop = data.data.total;
                    this.headersColTop = [
                        { field: 'title', header: 'Title', Style: { width: '200px', 'text-align': 'center' }, width: '500' },
                        { field: 'newstype', header: 'News Type', Style: { width: '100%', 'text-align': 'center' }, width: '100' },
                        { field: 'publisheddate', header: 'Published Date', Style: { width: '200px', 'text-align': 'center' }, width: '150' }
                    ];

                    this.loading = false;
                } else {
                    this.loading = false;
                    this.messageTop = data.message;
                }
            }
        )
    }


    loadCarsLazy(event: LazyLoadEvent) {

        var pagenum = event.first / event.rows + 1;
        if (event.globalFilter) {
            this.newspage.search = event.globalFilter;
        }
        this.newspage.pgnum = pagenum;
        setTimeout(() => {

            this.getNewsPage();

        }, 1000);

    }

    loadNewsLazyTop(event: LazyLoadEvent) {

        var pagenum = event.first / event.rows + 1;
        this.newspage.pgnum = pagenum;
        setTimeout(() => {

            this.getNewsPageTop();

        }, 1000);

    }

    deleteNews() {
        this.newsRequest.newsid = this.selectedNews.newsid;

        /*this._news.updateNews(this.newsRequest).subscribe(
            (data: any) => {
                if (data.code == "200") {
                    this.displayDialog = false;
                    this.getNewsPage();
                } else if (data.code !== "200") {
                    alert(data.message);
                }
            }
        )*/
    }

    onRowSelectStock(event) {
        this.mapStockId=[];
        this.mapStocks =[];
        this.selectedNews = event;
        if(this.selectedNews.mapstock){
            this.selectedNews.mapstock.forEach(element => {
                this.mapStocks.push(element);
            });
        }
        this.selectedNews.publisheddate = new Date(event.publisheddate);
        this.router.navigate(['pages/components/mojo-news-detail',{news_id:event._id}]);
        // this.displayDialog = true;

    }


    search(event) {
        this.searchrequest.search = event.query;
        this._search.getSearchID(this.searchrequest.search).subscribe(
            (data: any) => {
                if (data) {
                    data.forEach(element => {
                        element.Company = element.Company.replace('<b>', ' ').replace('</b>', '');
                    });
                    this.results = data;
                } else {
                    this.results = [{ Id: 0, Company: "no data found" }];
                }
            }
        )
    }

    cancel() {
        this.displayDialog = false;
    }


    sidSelect(event) {
        this.newspage.sid = event.Id;
        this.Company = event.Company;
        this.getNewsPage();
    }

    refresh() {
        this.newspage.pgnum = 1;
        this.newspage.search = "";
        this.newspage.sid = null;
        this.newspage.top = null;
        this.newspage.type = "";
        this.Company = "";
        this.getNewsPage();
    }

    saveTopNews(event) {
        this.settopnews.newsid = event.newsid;
        this.loading = true;
        this._news.setTopNews(this.settopnews).subscribe(
            (data: any) => {
                if (data.code == "200") {
                    this.getNewsPage();
                    this.getNewsPageTop();
                    this.loading = false;
                } else if (data.code !== "200") {
                    alert(data.message);
                    this.loading = false;
                }
            }
        )
    }


    AdddisplayDialog: boolean = false;
    addnews: AddNews = new AddNews();


    addNews() {
        this.mapStockId=[];
        this.mapStocks =[];
        this.addnews = new AddNews();
        this.router.navigate(['pages/components/mojo-news-add'])
        // this.AdddisplayDialog = true;
    }

    saveNews() {
        /*this.loading = true;
        this.addnews.isdeleted = 0;
        this.mapStocks.forEach(value =>{
            this.mapStockId.push(value.Id);
        });
        this.addnews.mapstock = this.mapStockId;
        this._news.addNews(this.addnews).subscribe(
            (data: any) => {
                if (data.code == "200") {
                    this.AdddisplayDialog = false;
                    this.getNewsPage();
                    this.getNewsPageTop();
                    this.loading = false;
                } else if (data.code !== "200") {
                    alert(data.message);
                    this.loading = false;
                    this.AdddisplayDialog = false;
                }
            }
        )*/
    }

    updateNews() {
        /*this.loading = true;
        this.mapStocks.forEach(value =>{
            this.mapStockId.push(value.Id);
        });
        this.addnews.mapstock = this.mapStockId;
        this.addnews.imagepath = this.selectedNews.imagepath;
        this.addnews.description = this.selectedNews.description;
        this.addnews.link = this.selectedNews.link;
        this.addnews.newsid = this.selectedNews.newsid;
        if (this.selectedNews.newstype == undefined) {
            this.selectedNews.newstype = "DSKNWS";
        }
        this.addnews.newstype = this.selectedNews.newstype;
        this.addnews.publisheddate = this.selectedNews.publisheddate;
        this.addnews.source = this.selectedNews.source;
        this.addnews.title = this.selectedNews.title;
        this.addnews.topnews = this.selectedNews.topnews;
        this._news.addNews(this.addnews).subscribe(
            (data: any) => {
                if (data.code == "200") {
                    this.getNewsPage();
                    this.getNewsPageTop();
                    this.loading = false;
                } else if (data.code !== "200") {
                    alert(data.message);
                    this.loading = false;
                }
            }
        )
        this.displayDialog = false;*/
    }
}
