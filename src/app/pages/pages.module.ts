import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ListboxModule} from 'primeng/listbox';
import {EditorModule} from 'primeng/editor';
import {FieldsetModule} from 'primeng/fieldset';
import {InputTextModule} from 'primeng/inputtext';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CheckboxModule} from 'primeng/checkbox';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    ListboxModule,
    EditorModule,
      CheckboxModule,
    FieldsetModule,
    InputTextModule,
    AutoCompleteModule
  ],
  declarations: [
    ...PAGES_COMPONENTS
  ],
})
export class PagesModule {
}
