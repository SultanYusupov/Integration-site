import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SingleSystemComponent } from './single-system/single-system.component';
import { IntegrationPageComponent } from './integration-page/integration-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SingleSystemComponent,
    IntegrationPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: MainPageComponent },
      { path: 'product/:id', component: SingleSystemComponent },
      { path: 'product/:id/:systemId', component: IntegrationPageComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
