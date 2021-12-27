import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SingleSystemComponent } from './single-system/single-system.component';
import { IntegrationPageComponent } from './integration-page/integration-page.component';
import { IntegrationService } from "./integration.service";
import { PopUpComponent } from './pop-up/pop-up.component';

import {BackendService} from './services/backend.service';
import {SettingsService} from "./services/settings.service";
import {SzgmDataService} from "./services/szgm-data.service";
import {ApplicationService} from "./services/application.service";
import {KpGeneratorService} from "./services/kp-generator.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {installStep} from "./model/install-step";
import { RequestService } from "./services/request.service";
import {ApplicationStorageService} from "./services/application-storage.service";

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
  ],
  providers: [IntegrationService, BackendService, SettingsService, SzgmDataService,
    ApplicationService, KpGeneratorService, RequestService, ApplicationStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
