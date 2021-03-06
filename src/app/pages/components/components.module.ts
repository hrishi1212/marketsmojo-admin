import { NgModule } from '@angular/core';

import { TreeModule } from 'ng2-tree';
import { ToasterModule } from 'angular2-toaster';

import { ThemeModule } from '../../@theme/theme.module';
import { ComponentsRoutingModule, routedComponents } from './components-routing.module';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {PaginatorModule} from 'primeng/paginator';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {PanelModule} from 'primeng/panel';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {EditorModule} from 'primeng/editor';

@NgModule({
  imports: [
    ThemeModule,
    ComponentsRoutingModule,
    TreeModule,
    ToasterModule,
    TableModule,
    TabViewModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    AutoCompleteModule,
    PanelModule,
    CheckboxModule,
    EditorModule,
    InputMaskModule,
    CalendarModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ComponentsModule { }
