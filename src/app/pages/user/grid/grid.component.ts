import { Component } from '@angular/core';
import { StockMaster } from "../../../domain/stockmaster";
import { StockMasterRequest } from "../../../domain/stockmaster.request";
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { UserService } from "../../../service/user.service";
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/primeng';
import {SelectItem } from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import { StockPage } from "../../../domain/stockmasterPage";
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SearchService } from "../../../service/search.service";
import { User } from "../../../domain/user";
import { UserRequest } from "../../../domain/user.request";


@Component({
  selector: 'ngx-grid',
  styleUrls: ['./grid.component.scss'],
  templateUrl: './grid.component.html',
  providers: [UserService,SearchService]
})
export class GridComponent {
  constructor(private _userservice: UserService,
    private _search: SearchService) {
  }

  loading: boolean;
  totalRecords: number;

  user : User = new User();
  userRequest : UserRequest = new UserRequest();


  userTable : User[];
  headersCol: any[];
  results: any[];

  ngOnInit() { }

  getUserPage() {
    this.loading = true;
    this._userservice.getUser(this.userRequest).subscribe(
      (data: any) => {
        if (data.code == "200") {
          this.userTable = data.data.results;
          this.totalRecords = data.data.total;
          this.headersCol = [
          
            { field: 'display_name', header: 'Display Name',width:'150'},
            { field: 'email', header: 'Email',width:'200' },
            { field: 'expiry_date', header: 'Expiry Date',width:'100' },
            { field: 'ispaid', header: 'Paid',width:'50' },
            { field: 'login_id', header: 'Login Id',width:'300' },
            { field: 'phone', header: 'Phone',width:'130' },
            { field: 'autologin', header: 'login',width:'200' }

          ];
          this.loading = false;
        }
      }
    )
  }


  loadCarsLazy(event: LazyLoadEvent) {
    var pagenum = event.first / event.rows + 1;
    if(event.globalFilter){
      this.userRequest.search = event.globalFilter;
    }
    this.userRequest.pgnum = pagenum;
    setTimeout(() => {

      this.getUserPage();

    }, 1000);

  }

}
