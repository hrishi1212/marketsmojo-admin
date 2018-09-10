import { Component, Input} from '@angular/core';
import { Location } from '@angular/common';
import {Router,ActivatedRoute} from "@angular/router";
// import { TreeModel } from 'ng2-tree';
// import { NewsPage } from "../../../domain/newspage";
// import { NewsRequest } from "../../../domain/news.request";
import { News } from "../../../domain/news";
// import { TableModule } from 'primeng/table';
// import { TabViewModule } from 'primeng/tabview';
// import { NewsService } from "../../../service/news.service";
import { MojoNewsService } from "../../../service/mojonews.service";
// import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
// import { DialogModule } from 'primeng/dialog';
// import { ButtonModule } from 'primeng/button';
// import { InputTextareaModule } from 'primeng/inputtextarea';
// import { InputTextModule } from 'primeng/inputtext';
// import { AutoCompleteModule } from 'primeng/autocomplete';
// import { Search } from "../../../domain/search";
import { SearchService } from "../../../service/search.service";
import { SearchRequest } from "../../../domain/search.request";
// import { AnimationGroupPlayer } from '@angular/animations/src/players/animation_group_player';
// import { PanelModule } from 'primeng/panel';
// import { SetTopNews } from "../../../domain/settopnews.request";
import { AddNews } from "../../../domain/addnews.request";
// import { InputMaskModule } from 'primeng/inputmask';
// import { CalendarModule } from 'primeng/calendar';


@Component({
    selector: 'ngx-tree',
    templateUrl: './mojo-news-detail.component.html',
    providers: [MojoNewsService, SearchService]
})

export class MojoNewsDetailComponent{
    constructor(private router: Router,private _news: MojoNewsService,private _search: SearchService,private _route: ActivatedRoute, private location: Location) {

    }
    @Input() suggestions: string;
    private selNews ;
    selNewsDetails;
    newsDetailData;
    searchrequest: SearchRequest = new SearchRequest();
    addnews: AddNews = new AddNews();
    mapStocks: any[] = [];
    mapStockId : any[] = [];
    NewsDrop: SelectItem[];
    TopDrop: SelectItem[];
    public action : string;
    results : any[];
    loading : boolean;
    ngOnInit(){
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
        if(this.location.path() != "" && this.location.path() == "/pages/components/mojo-news-add"){
                this.selNewsDetails = new AddNews();
                this.action = 'add';
        }else {
            this.action = 'update';
            this.newsDetailData = new News();
            this._route.params.subscribe(params => {
                this.selNews = params
            });
            this._news.getNewsDetail({newsid: this.selNews.news_id}).subscribe((data: any) => {
                if (data.code == "200") {
                    this.newsDetailData = data.data.results[0];
                    this.newsDetailData.publisheddate = new Date(this.newsDetailData.publisheddate);
                    this.newsDetailData.mapstock.forEach(element => {
                        this.mapStocks.push(element);
                    });
                }
            });
        }
    }
    cancel(){
        this.router.navigate(['pages/components/mojo-news']);
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
    update(){
        this.loading = true;
        this.mapStocks.forEach(value =>{
            this.mapStockId.push(value.Id);
        });
        this.newsDetailData.mapstock = this.mapStockId;
        this._news.updateNews(this.newsDetailData).subscribe(
            (data: any) => {
                if (data.code == "200") {
                    if(data.data==true){
                        alert("News has been updated successfully");
                        this.router.navigate(['pages/components/mojo-news']);
                    }else{
                        alert(data.data.message);
                    }
                } else if (data.code !== "200") {
                    alert(data.message);
                }
            }
        )
    }
    deleteNews(){
        // this.news_id = {newsid:this.newsDetailData._id};
        this._news.deleteNews({newsid:this.newsDetailData._id}).subscribe(
            (data: any) => {
                if (data.code == "200") {
                    alert(data.message);
                    this.router.navigate(['pages/components/mojo-news']);
                } else if (data.code !== "200") {
                    alert(data.message);
                }
            }
        )
    }
    saveNews() {
        this.loading = true;
        this.addnews.isdeleted = 0;
        this.mapStocks.forEach(value =>{
            this.mapStockId.push(value.Id);
        });
        this.addnews.mapstock = this.mapStockId;
        this._news.addNews(this.addnews).subscribe(
            (data: any) => {
                if (data.code == "200") {
                    alert(data.message);
                    this.router.navigate(['pages/components/mojo-news']);
                } else if (data.code !== "200") {
                    alert(data.message);
                }
            }
        )
    }
}