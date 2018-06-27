import { Component } from '@angular/core';
import { TreeModel } from 'ng2-tree';
import { NewsPage } from "../../../domain/newspage";
import { NewsRequest } from "../../../domain/news.request";
import { News } from "../../../domain/news";
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { NewsService } from "../../../service/news.service";
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'ngx-tree',
  templateUrl: './news.component.html',
  providers: [NewsService]
})
export class NewsComponent {

  constructor(private _news: NewsService) {
  }

  loading: boolean;
  totalRecords: number;

  news :News = new News();
  newsRequest : NewsRequest = new NewsRequest();
  newspage : NewsPage = new NewsPage();

  newsArray : News[];
  headersCol: any[];
  selectedNews: News;
  newsNew : News;
  displayDialog : boolean;

  ngOnInit() { }

  getNewsPage(){
    this.loading = true;
    this._news.getNewsPage(this.newspage).subscribe(
      (data:any)=>{
        
        if(data.code == "200"){
          this.newsArray = data.data.results;
          this.totalRecords = data.data.total;
          this.headersCol = [
            {field:'newsid',header:'newsid',Style: {width: '200px', 'text-align': 'center'},width:'350'},
            {field:'title',header:'title',Style: {width: '200px', 'text-align': 'center'},width:'500'},
            {field:'imagepath',header:'imagepath',Style: {width: '200px', 'text-align': 'center'},width:'500'},
            {field:'link',header:'link',Style: {width: '200px', 'text-align': 'center'},width:'500'},
            {field:'source',header:'source',Style: {width: '200px', 'text-align': 'center'},width:'500'},
            {field:'publisheddate',header:'publisheddate',Style: {width: '200px', 'text-align': 'center'},width:'350'},
            {field:'description',header:'description',Style: {width: '200px', 'text-align': 'center'},width:'500'},
            {field:'newstype',header:'newstype',Style: {width: '200px', 'text-align': 'center'},width:'200'},
            {field:'isdeleted',header:'isdeleted',Style: {width: '50px', 'text-align': 'center'},width:'100'},
            {field:'topnews',header:'topnews',Style: {width: '50px', 'text-align': 'center'},width:'100'},
          ];
       
          this.loading= false;
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

  
}
