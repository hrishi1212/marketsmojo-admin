import { Component, Input } from '@angular/core';
import { TreeModel } from 'ng2-tree';
import { NewsPage } from "../../../domain/newspage";
import { NewsRequest } from "../../../domain/news.request";
import { News } from "../../../domain/news";
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { NewsService } from "../../../service/news.service";
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { Search } from "../../../domain/search";
import { SearchService } from "../../../service/search.service";
import { SearchRequest } from "../../../domain/search.request";
import { AnimationGroupPlayer } from '@angular/animations/src/players/animation_group_player';
import {PanelModule} from 'primeng/panel';
import { SetTopNews } from "../../../domain/settopnews.request";
import { AddNews } from "../../../domain/addnews.request";
import {InputMaskModule} from 'primeng/inputmask';

@Component({
  selector: 'ngx-tree',
  templateUrl: './news.component.html',
  providers: [NewsService,SearchService]
})
export class NewsComponent {

  constructor(private _news: NewsService,
  private _search : SearchService) {
  }

  @Input() suggestions : string;

  loading: boolean;
  totalRecords: number;
  totalRecordsTop:number;

  news :News = new News();
  newsRequest : NewsRequest = new NewsRequest();
  newspage : NewsPage = new NewsPage();
  searchrequest : SearchRequest = new SearchRequest();
  settopnews : SetTopNews = new SetTopNews();

  newsArray : News[];
  newsArrayTop : News[];
  headersCol: any[];
  headersColTop : any[];
  selectedNews: News;
  newsNew : News;
  displayDialog : boolean;
  Company: string;
  results: any[];
  searchString = [];
  NewsDrop: SelectItem[];
  TopDrop : SelectItem[];
  message :string;
  messageTop :string;

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

  getNewsPage(){
    this.loading = true;
    this._news.getNewsPage(this.newspage).subscribe(
      (data:any)=>{
        
        if(data.code == "200"){
         
          this.newsArray = data.data.results;
          this.totalRecords = data.data.total;
          this.headersCol = [
            {field:'title',header:'Title',Style: {width: '200px', 'text-align': 'center'},width:'500'},
            {field:'newstype',header:'News Type',Style: {width: '100%', 'text-align': 'center'},width:'100'},
            {field:'source',header:'Source',Style: {width: '200px', 'text-align': 'center'},width:'350'},
            {field:'publisheddate',header:'Published Date',Style: {width: '200px', 'text-align': 'center'},width:'150'}

          ];
       
          this.loading= false;
        }else{
          this.loading = false;
          this.message   = data.message;
        }
      }
    )
  }

  
  getNewsPageTop(){
    this.loading = true;
    this._news.getNewsPageTop(this.newspage).subscribe(
      (data:any)=>{
        
        if(data.code == "200"){
         
          this.newsArrayTop = data.data.results;
          this.totalRecordsTop = data.data.total;
          this.headersColTop = [
            {field:'topnews',header:'topnews',Style: {width: '200px', 'text-align': 'center'},width:'100'},
            {field:'title',header:'Title',Style: {width: '200px', 'text-align': 'center'},width:'500'},
            {field:'newstype',header:'News Type',Style: {width: '100%', 'text-align': 'center'},width:'100'},
            {field:'source',header:'Source',Style: {width: '200px', 'text-align': 'center'},width:'350'},
            {field:'publisheddate',header:'Published Date',Style: {width: '200px', 'text-align': 'center'},width:'150'}
          ];
       
          this.loading= false;
        }else{
          this.loading = false;
          this.messageTop   = data.message;
        }
      }
    )
  }


  loadCarsLazy(event: LazyLoadEvent) {
    
    var pagenum = event.first / event.rows + 1;
    if(event.globalFilter){
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

  deleteNews(){
    this.newsRequest.newsid = this.selectedNews.newsid;
    
    this._news.updateNews(this.newsRequest).subscribe(
            (data:any)=>{
              if(data.code == "200"){
                this.displayDialog = false;
                this.getNewsPage();
              }else if(data.code !== "200"){
               alert(data.message);
              }
            }
          )
  }


  onRowSelectStock(event) {
        this.selectedNews = event;
        this.displayDialog=true;
        
      }

      search(event) {
        this.searchrequest.search = event.query;
        this._search.getSearchID(this.searchrequest.search).subscribe(
          (data:any)=>{
            if(data){
              data.forEach(element => {
               element.Company = element.Company.replace('<b>',' ').replace('</b>','');
              });
              this.results = data;
            }else{
              this.results = [{Id:0,Company:"no data found"}];
            }
          }
        )
       
    }

      cancel(){
        this.displayDialog = false;
      }


      sidSelect(event){
        this.newspage.sid = event.Id;
        this.Company = event.Company;
        this.getNewsPage();
      }

      refresh(){
        this.newspage.pgnum = 1;
        this.newspage.search = "";
        this.newspage.sid = null;
        this.newspage.top = null;
        this.newspage.type = "";
        this.Company = "";
        this.getNewsPage();
      }

      saveTopNews(event){
        this.settopnews.newsid = event.newsid;
       this.loading= true;
        this._news.setTopNews(this.settopnews).subscribe(
          (data:any)=>{
            if(data.code == "200"){
              this.getNewsPage();
              this.getNewsPageTop();
              this.loading = false;
            }else if(data.code !== "200"){
             alert(data.message);
             this.loading = false;
            }
          }
        )
      }


      AdddisplayDialog : boolean = false;
      addnews : AddNews = new AddNews();


      addNews(){
        this.addnews = new AddNews();
        this.AdddisplayDialog = true; 
      }

      saveNews(){
        this.addnews.isdeleted = 0;
        this._news.addNews(this.addnews).subscribe(
          (data:any)=>{
            if(data.code == "200"){
              this.AdddisplayDialog = false;
              this.getNewsPage();
              this.getNewsPageTop();
              this.loading = false;
            }else if(data.code !== "200"){
             alert(data.message);
             this.loading = false;
             this.AdddisplayDialog = false;
            }
          }
        )
      }
}
