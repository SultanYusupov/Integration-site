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
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: MainPageComponent},
      {path: 'products/:id1', component: SingleSystemComponent},
      {path: 'products/:id1/:id2', component: IntegrationPageComponent},
    ]),
  ],
  providers: [IntegrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
