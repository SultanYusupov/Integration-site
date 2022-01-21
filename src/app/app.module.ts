import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxMetrikaModule } from '@kolkov/ngx-metrika';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SingleSystemComponent } from './single-system/single-system.component';
import { IntegrationPageComponent } from './integration-page/integration-page.component';
import { IntegrationService } from "./integration.service";
import { PopUpComponent } from './pop-up/pop-up.component';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RequestService } from "./services/request.service";
import {ApplicationStorageService} from "./services/application-storage.service";
import {environment} from "../environments/environment.prod";


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SingleSystemComponent,
    IntegrationPageComponent,
    PopUpComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: MainPageComponent},
      {path: 'products/:id1', component: SingleSystemComponent},
      {path: 'products/:id1/:id2', component: IntegrationPageComponent},
    ]),
    NgxMetrikaModule.forRoot({
      id: environment.yaCounterId,
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor:true
    })
  ],
  providers: [IntegrationService, RequestService, ApplicationStorageService,
    {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
