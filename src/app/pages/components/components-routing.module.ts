import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components.component';
import { NewsComponent } from './news/news.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [{
  path: '',
  component: ComponentsComponent,
  children: [
  {
    path: 'news',
    component: NewsComponent,
  }, {
    path: 'notifications',
    component: NotificationsComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule { }

export const routedComponents = [
  ComponentsComponent,
  NewsComponent,
  NotificationsComponent,
];
