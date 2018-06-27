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

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./stock-master.component.scss'],
  templateUrl: './stock-master.component.html',
  providers: [StockMasterService]
})
export class StockMasterComponent {
  constructor(private _stockmaster: StockMasterService) {
  }


  loading: boolean;
  totalRecords: number;
  stockmaster: StockMaster = new StockMaster();
  stockmasterRequest :StockMasterRequest = new StockMasterRequest();
  stockpage: StockPage = new StockPage();

  stockMaster: StockMaster[];
  headersCol: any[];
  selectedStock: StockMaster;
  stocknew : StockMaster;
  displayDialog : boolean;
  ngOnInit() { }

  getstockPage() {
    this.loading = true;
    this._stockmaster.getstockPage(this.stockpage).subscribe(
      (data: any) => {
        if (data.code == "200") {
          this.stockMaster = data.data.results;
          this.totalRecords = data.data.total;
          this.headersCol = [
            { field: 'STOCKID', header: 'STOCKID' },
            { field: 'FINCODE', header: 'FINCODE' },
            { field: 'COMPNAME', header: 'COMPNAME' },
            { field: 'S_NAME', header: 'S_NAME' },
            { field: 'ACC_IND_CODE', header: 'ACC_IND_CODE' },
            { field: 'ACC_Ind_Name', header: 'ACC_Ind_Name' },
            { field: 'IND_CODE', header: 'IND_CODE' },
            { field: 'Ind_Name', header: 'Ind_Name' },
            { field: 'HSE_CODE', header: 'HSE_CODE' },
            { field: 'Hse_Name', header: 'Hse_Name' },
            { field: 'SCRIPCODE', header: 'SCRIPCODE' },
            { field: 'SCRIP_GROUP', header: 'SCRIP_GROUP' },
            { field: 'SYMBOL', header: 'SYMBOL' },
            { field: 'SERIES', header: 'SERIES' },
            { field: 'ISIN', header: 'ISIN' },
            { field: 'Cap_Class', header: 'Cap_Class' },
            { field: 'CHAIRMAN', header: 'CHAIRMAN' },
            { field: 'COSEC', header: 'COSEC' },
            { field: 'FFORMAT', header: 'FFORMAT' },
            { field: 'FV', header: 'FV' },
            { field: 'INC_MONTH', header: 'INC_MONTH' },
            { field: 'INC_YEAR', header: 'INC_YEAR' },
            { field: 'MDIR', header: 'MDIR' },
            { field: 'RFORMAT', header: 'RFORMAT' },
            { field: 'SCRIP_NAME', header: 'SCRIP_NAME' },
            { field: 'Status', header: 'Status' },
            { field: 'Sublisting', header: 'Sublisting' },
            { field: 'FLAG', header: 'FLAG' },
            { field: 'SC_COMP', header: 'SC_COMP' },
            { field: 'SC_FULLNAME', header: 'SC_FULLNAME' },
            { field: 'IsSeasonal', header: 'IsSeasonal' },
            { field: 'MCAPType', header: 'MCAPType' },
            { field: 'MCAPRank', header: 'MCAPRank' },
            { field: 'Alias', header: 'Alias' },
            { field: 'QualityRank', header: 'QualityRank' },
            { field: 'QalityScoreText', header: 'QalityScoreText' },
            { field: 'QualityTotal', header: 'QualityTotal' },
            { field: 'ValuationRank', header: 'ValuationRank' },
            { field: 'ValuationScoreText', header: 'ValuationScoreText' },
            { field: 'CFTScore', header: 'CFTScore' },
            { field: 'MergedWithStockID', header: 'MergedWithStockID' },
            { field: 'MergedWithStockRatio', header: 'MergedWithStockRatio' },
            { field: 'HeaderMessage', header: 'HeaderMessage' },
            { field: 'StockNewsName', header: 'StockNewsName' },
            { field: 'NewsPriority', header: 'NewsPriority' },
            { field: 'HeaderMessageFromDT', header: 'HeaderMessageFromDT' },
            { field: 'HeaderMessageToDT', header: 'HeaderMessageToDT' }

          ];
          this.loading = false;
        }
      }
    )
  }

  loadCarsLazy(event: LazyLoadEvent) {
    console.log(event);
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
    this.stockmasterRequest.sid = s.STOCKID;
    this.stockmasterRequest.ACC_IND_CODE = s.ACC_IND_CODE;
    this.stockmasterRequest.ACC_Ind_Name = s.ACC_Ind_Name;
    this.stockmasterRequest.Alias = s.Alias;
    this.stockmasterRequest.Cap_Class = s.Cap_Class;
    this.stockmasterRequest.CFTScore = s.CFTScore;
    this.stockmasterRequest.CHAIRMAN = s.CHAIRMAN;
    this.stockmasterRequest.COMPNAME = s.COMPNAME;
    this.stockmasterRequest.COSEC=s.COSEC;
    this.stockmasterRequest.FFORMAT=s.FFORMAT;
    this.stockmasterRequest.fincode =s.FINCODE;
    this.stockmasterRequest.FLAG=s.FLAG;
    this.stockmasterRequest.FV=s.FV;
    this.stockmasterRequest.HeaderMessage=s.HeaderMessage;
    this.stockmasterRequest.HeaderMessageFromDT=s.HeaderMessageFromDT;
    this.stockmasterRequest.HeaderMessageToDT=s.HeaderMessageToDT;
    this.stockmasterRequest.HSE_CODE=s.HSE_CODE;
    this.stockmasterRequest.Hse_Name=s.Hse_Name;
    this.stockmasterRequest.INC_MONTH=s.INC_MONTH;
    this.stockmasterRequest.INC_YEAR=s.INC_YEAR;
    this.stockmasterRequest.ind_code=s.IND_CODE;
    this.stockmasterRequest.Ind_Name=s.Ind_Name;
    this.stockmasterRequest.ISIN = s.ISIN;
    this.stockmasterRequest.IsSeasonal = s.IsSeasonal;
    this.stockmasterRequest.MCAPRank = s.MCAPRank;
    this.stockmasterRequest.MCAPType = s.MCAPType;
    this.stockmasterRequest.MDIR = s.MDIR;
    this.stockmasterRequest.MergedWithStockID = s.MergedWithStockID;
    this.stockmasterRequest.MergedWithStockRatio = s.MergedWithStockRatio;
    this.stockmasterRequest.NewsPriority = s.NewsPriority;
    this.stockmasterRequest.QalityScoreText = s.QalityScoreText;
    this.stockmasterRequest.QualityRank = s.QualityRank;
    this.stockmasterRequest.QualityTotal = s.QualityTotal;
    this.stockmasterRequest.RFORMAT = s.RFORMAT;
    this.stockmasterRequest.S_NAME = s.S_NAME;
    this.stockmasterRequest.SC_COMP = s.SC_COMP;
    this.stockmasterRequest.SCRIP_GROUP = s.SCRIP_GROUP;
    this.stockmasterRequest.SCRIP_NAME = s.SCRIP_NAME;
    this.stockmasterRequest.SCRIPCODE = s.SCRIPCODE;
    this.stockmasterRequest.SERIES = s.SERIES;
    this.stockmasterRequest.Status = s.Status;
    this.stockmasterRequest.StockNewsName = s.StockNewsName;
    this.stockmasterRequest.Sublisting = s.Sublisting;
    this.stockmasterRequest.SYMBOL = s.SYMBOL;
    this.stockmasterRequest.ValuationRank = s.ValuationRank;
    this.stockmasterRequest.ValuationScoreText = s.ValuationScoreText;
  }

  cancel(){
    this.displayDialog = false;
  }

  updateStock(){
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
