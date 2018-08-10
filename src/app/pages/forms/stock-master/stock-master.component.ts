import { Component } from '@angular/core';
import { StockMaster } from "../../../domain/stockmaster";
import { StockMasterRequest } from "../../../domain/stockmaster.request";
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { StockMasterService } from "../../../service/stockmaster.service";
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/primeng';
import { StockPage } from "../../../domain/stockmasterPage";
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Search } from "../../../domain/search";
import { SearchService } from "../../../service/search.service";
import { SearchRequest } from "../../../domain/search.request";
@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./stock-master.component.scss'],
  templateUrl: './stock-master.component.html',
  providers: [StockMasterService,SearchService]
})
export class StockMasterComponent {
  constructor(private _stockmaster: StockMasterService,
    private _search: SearchService) {
  }


  loading: boolean;
  totalRecords: number;
  stockmaster: StockMaster = new StockMaster();
  stockmasterRequest :StockMasterRequest = new StockMasterRequest();
  stockpage: StockPage = new StockPage();
  searchrequest: SearchRequest = new SearchRequest();
  results: any[];

  stockMaster: StockMaster[];
  headersCol: any[];
  selectedStock: StockMaster;
  stocknew : StockMaster;
  displayDialog : boolean;
  ngOnInit() { }

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

  getstockPage() {
    this.loading = true;
    this._stockmaster.getstockPage(this.stockpage).subscribe(
      (data: any) => {
        if (data.code == "200") {
          this.stockMaster = data.data.results;
          this.totalRecords = data.data.total;
          this.headersCol = [
          
            { field: 'fincode', header: 'FINCODE',width:'100'},
            { field: 'compname', header: 'COMPNAME',width:'200' },
            { field: 's_name', header: 'S_NAME',width:'200' },
            { field: 'acc_ind_name', header: 'ACC_Ind_Name',width:'200' },
            { field: 'ind_name', header: 'Ind_Name',width:'200' }

          ];
          this.loading = false;
        }
      }
    )
  }
  Company : string;
sidSelect(event) {
    this.stockpage.sid = event.Id;
    this.Company = event.Company;
   this.getstockPage();
  }
  loadCarsLazy(event: LazyLoadEvent) {
    var pagenum = event.first / event.rows + 1;
    if(event.globalFilter){
      this.stockpage.search = event.globalFilter;
    }
    this.stockpage.pgnum = pagenum;
    setTimeout(() => {

      this.getstockPage();

    }, 1000);

  }

  onRowSelectStock(event) {

    this.cloneStock(event);
    this.displayDialog=true;
  }

  cloneStock(s:StockMaster){
    this.stockmasterRequest.stockid = s.stockid;
    this.stockmasterRequest.acc_ind_code = s.acc_ind_code;
    this.stockmasterRequest.acc_ind_name = s.acc_ind_name;
    this.stockmasterRequest.alias = s.alias;
    this.stockmasterRequest.cap_class = s.cap_class;
    this.stockmasterRequest.cftscore = s.cftscore;
    this.stockmasterRequest.chairman = s.chairman;
    this.stockmasterRequest.compname = s.compname;
    this.stockmasterRequest.cosec=s.cosec;
    this.stockmasterRequest.fformat=s.fformat;
    this.stockmasterRequest.fincode =s.fincode;
    this.stockmasterRequest.flag=s.flag;
    this.stockmasterRequest.fv=s.fv;
    this.stockmasterRequest.headermessage=s.headermessage;
    this.stockmasterRequest.headermessagefromdt=s.headermessagefromdt;
    this.stockmasterRequest.headermessagetodt=s.headermessagetodt;
    this.stockmasterRequest.hse_code=s.hse_code;
    this.stockmasterRequest.hse_name=s.hse_name;
    this.stockmasterRequest.inc_month=s.inc_month;
    this.stockmasterRequest.inc_year=s.inc_year;
    this.stockmasterRequest.ind_code=s.ind_code;
    this.stockmasterRequest.ind_name=s.ind_name;
    this.stockmasterRequest.isin = s.isin;
    this.stockmasterRequest.isseasonal = s.isseasonal;
    this.stockmasterRequest.mcaprank = s.mcaprank;
    this.stockmasterRequest.mcaptype = s.mcaptype;
    this.stockmasterRequest.mdir = s.mdir;
    this.stockmasterRequest.mergedwithstockid = s.mergedwithstockid;
    this.stockmasterRequest.mergedwithstockratio = s.mergedwithstockratio;
    this.stockmasterRequest.newspriority = s.newspriority;
    this.stockmasterRequest.qalityscoretext = s.qalityscoretext;
    this.stockmasterRequest.qualityrank = s.qualityrank;
    this.stockmasterRequest.qualitytotal = s.qualitytotal;
    this.stockmasterRequest.rformat = s.rformat;
    this.stockmasterRequest.s_name = s.s_name;
    this.stockmasterRequest.sc_comp = s.sc_comp;
    this.stockmasterRequest.scrip_group = s.scrip_group;
    this.stockmasterRequest.scrip_name = s.scrip_name;
    this.stockmasterRequest.scripcode = s.scripcode;
    this.stockmasterRequest.series = s.series;
    this.stockmasterRequest.status = s.status;
    this.stockmasterRequest.stocknewsname = s.stocknewsname;
    this.stockmasterRequest.sublisting = s.sublisting;
    this.stockmasterRequest.symbol = s.symbol;
    this.stockmasterRequest.valuationrank = s.valuationrank;
    this.stockmasterRequest.valuationscoretext = s.valuationscoretext;
  }

  cancel(){
    this.displayDialog = false;
  }

  updateStock(){
    this.stockmasterRequest.userid = localStorage.getItem('userid');
    this._stockmaster.updateStock(this.stockmasterRequest).subscribe(

      (data:any)=>{
        if(data.code == "200"){
          this.displayDialog = false;
          this.getstockPage();
        }else if(data.code !== "200"){
         alert(data.message);
        }
      }
    )
  }
}
