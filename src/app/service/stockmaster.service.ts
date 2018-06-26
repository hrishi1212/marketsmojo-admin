import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { CMS_URL } from './url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StockMaster } from "../domain/stockmaster";
import { StockMasterRequest } from "../domain/stockmaster.request";
import { StockPage } from "../domain/stockmasterPage";


@Injectable()
export class StockMasterService {
    constructor(private http: Http,
        private httpc: HttpClient) { }

        getstockPage(stockpage :StockPage){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(stockpage);

            return this.httpc.post<StockMaster>(CMS_URL + '/stockmaster/getStocks',body);
        }

        updateStock(stockrequest:StockMasterRequest){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(stockrequest);

            return this.httpc.post<StockMasterRequest>(CMS_URL + '/stockmaster/updateStockDetails',body);
        }
}
