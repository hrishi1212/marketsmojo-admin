import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ButtonsModule } from './buttons/buttons.module';
import { UiFeaturesRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { GridComponent } from './grid/grid.component';
import { ModalsComponent } from './modals/modals.component';
import { IconsComponent } from './icons/icons.component';
import { ModalComponent } from './modals/modal/modal.component';
import { TypographyComponent } from './typography/typography.component';
import { TabsComponent, Tab1Component, Tab2Component } from './tabs/tabs.component';
import { SearchComponent } from './search-fields/search-fields.component';
import { PopoversComponent } from './popovers/popovers.component';
import { FeedbackComponent } from './feedback/feedback.component';
import {TableModule} from 'primeng/table';
import {DataTableModule} from 'primeng/datatable';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {ListboxModule} from 'primeng/listbox';
import {EditorModule} from 'primeng/editor';
import {TabViewModule} from 'primeng/tabview';
import {FieldsetModule} from 'primeng/fieldset';


import {
  NgxPopoverCardComponent, NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
} from './popovers/popover-examples.component';

const components = [
  UserComponent,
  FeedbackComponent,
  GridComponent,
  ModalsComponent,
  IconsComponent,
  ModalComponent,
  TypographyComponent,
  TabsComponent,
  Tab1Component,
  Tab2Component,
  SearchComponent,
  PopoversComponent,
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    UiFeaturesRoutingModule,
    ButtonsModule,
    TableModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    ButtonModule,
    ListboxModule,
    EditorModule,
    TabViewModule,
    FieldsetModule
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    ModalComponent,
    NgxPopoverCardComponent,
    NgxPopoverFormComponent,
    NgxPopoverTabsComponent,
  ],
})
export class UiFeaturesModule { }
