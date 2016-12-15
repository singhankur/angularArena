import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AppService } from './common/app.http-service';
import { DataService } from './common/app.data-service';


import { SharedModule } from './common/app.shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { SearchByCriteriaComponent } from './views/shared/search-by-criteria/search-by-criteria.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchByCriteriaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    SharedModule
  ],
  providers: [
    AppService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
