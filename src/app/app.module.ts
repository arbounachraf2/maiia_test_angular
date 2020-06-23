import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {GoogleChartsModule} from 'angular-google-charts';
import {NgApexchartsModule} from 'ng-apexcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from "./angular-material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DecimalPipe} from "@angular/common";
import {NgxBootstrapSliderModule} from "ngx-bootstrap-slider";
import { MessageComponent } from './components/message/message.component';
import { SortableDirective } from './components/message/sortable.directive';



@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    SortableDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    MatCardModule,
    NgbModule,
    NgxBootstrapSliderModule
  ],
  providers: [
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
