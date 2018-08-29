import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {PaginatorModule} from 'primeng/paginator';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    TableModule,
    TabViewModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    AutoCompleteModule,
    DropdownModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class FormsModule { }
