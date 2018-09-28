import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components.component';
import { NewsComponent } from './news/news.component';
import { MojoNewsComponent } from './mojo-news/mojo-news.component';
import { MojoNewsDetailComponent } from './mojo-news-detail/mojo-news-detail.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [{
    path: '',
    component: ComponentsComponent,
    children: [{
        path: 'news',
        component: NewsComponent,
    },{
        path: 'mojo-news',
        component: MojoNewsComponent,
    },{
        path: 'mojo-news-detail',
        component: MojoNewsDetailComponent,
    },{
        path: 'mojo-news-add',
        component: MojoNewsDetailComponent
    },{
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
    MojoNewsComponent,
    MojoNewsDetailComponent,
    NotificationsComponent,
];
