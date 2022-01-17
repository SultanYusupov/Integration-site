import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStorageService {

  private soloapp: {
    APP_NAME: string
    LICENCE_LINK: string
    token: string
    APP_SID: string
    PROTOCOL: string
    DOMAIN: string
  };

  constructor() {
    this.soloapp = (<any>window).soloapp;
    // console.log(this.soloapp);
    // console.log('this is application-storage')
  }

  get token(){
    return this.soloapp.token
  }
  get appName(){
    return this.soloapp.APP_NAME
  }
  get licenceLink(){
    return this.soloapp.LICENCE_LINK
  }
  get APP_SID(){
    return this.soloapp.APP_SID
  }
  get PROTOCOL(){
    return this.soloapp.PROTOCOL
  }
  get DOMAIN(){
    return this.soloapp.DOMAIN
  }
}
