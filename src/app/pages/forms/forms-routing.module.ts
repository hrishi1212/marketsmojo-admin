import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';
import { StockMasterComponent } from './stock-master/stock-master.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';

const routes: Routes = [{
  path: '',
  component: FormsComponent,
  children: [{
    path: 'stock-master',
    component: StockMasterComponent,
  }, {
    path: 'layouts',
    component: FormLayoutsComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class FormsRoutingModule {

}

export const routedComponents = [
  FormsComponent,
  StockMasterComponent,
  FormLayoutsComponent,
];
