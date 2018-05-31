/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { LoginComponent } from './login/login.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  
})
// <router-outlet></router-outlet>
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
    private router: Router,) {
  }
   login = false;

  ngOnInit(): void {
    this.analytics.trackPageViews();
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
    var  login = localStorage.getItem("login");
    if(login==='true')
    {
        this.router.navigate(["/pages/dashboard"]);
    }else{
      this.router.navigate(["/login"]);
    }

  }
}
