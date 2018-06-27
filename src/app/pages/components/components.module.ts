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
    InputTextModule

  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ComponentsModule { }
