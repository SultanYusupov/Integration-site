import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestService} from "./request.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  settings: iApplicationInitSettings
  allowUsers: any = [];

  constructor(
    private bs: RequestService
  ) {
    this.settings = (<any>window).application;
  }

  isPlacement(){
    return this.settings.PLACEMENT != "DEFAULT"
  }

  isAdmin(){
    return this.settings.profile.ADMIN
  }

  // я закомментировал
  /*do(){
     return this.bs.get('serve', 'do.test')
  }*/

  havePermission(perm: S_Permission){
    console.log(this.settings.permissions)
    console.log(perm)
    return this.settings.permissions[perm].indexOf(this.settings.profile.ID) >= 0;
  }
  haveDealStages(){
    return !!this.settings.deal?.plan_stages;
  }


}
export type S_Permission = "show_dates" | "edit_administrative" | "edit_production";
export interface iDealStagesListResponse {
  deal: iDealClear,
  deal_id: string,
  list: {
    [stageCode: string]: iStageData
  }
}
export interface iStageData {
  DATE_INSERT_TS: number
  DATE_UPDATE_TS: number
  STAGE_DATE_PLAN_TS: number
  STAGE_DATE_FACT_TS: number
  DATE_INSERT: string
  DATE_UPDATE: string
  DEAL_ID: string
  DEAL_TITLE: string
  ID: string
  IS_EXPIRED: string
  STAGE_DATE_FACT: string
  STAGE_DATE_PLAN: string
  STAGE_ID: string
  STAGE_TITLE: string
}
export interface iDealClear {
  ADDITIONAL_INFO: string
  ASSIGNED_BY_ID: string
  BEGINDATE: string
  CATEGORY_ID: string
  CLOSED: string
  CLOSEDATE: string
  COMMENTS: string
  COMPANY_ID: string
  CONTACT_ID: string
  CREATED_BY_ID: string
  CURRENCY_ID: string
  DATE_CREATE: string
  DATE_MODIFY: string
  ID: string
  IS_MANUAL_OPPORTUNITY: string
  IS_NEW: string
  IS_RECURRING: string
  IS_REPEATED_APPROACH: string
  IS_RETURN_CUSTOMER: string
  LEAD_ID: string
  LOCATION_ID: string
  MODIFY_BY_ID: string
  OPENED: string
  OPPORTUNITY: string
  ORIGINATOR_ID: string
  ORIGIN_ID: string
  PROBABILITY: string
  QUOTE_ID: string
  SOURCE_DESCRIPTION: string
  SOURCE_ID: string
  STAGE_ID: string
  STAGE_SEMANTIC_ID: string
  TAX_VALUE: string
  TITLE: string
  TYPE_ID: string
}
export interface iApplicationInitSettings {
  DOMAIN: string
  APP_SID: string
  APP_ID: string
  AUTH_ID: string
  REFRESH_ID: string
  member_id: string
  PLACEMENT: string
  permissions: {
    show_dates: Array<string>,
    edit_administrative: Array<string>,
    edit_production: Array<string>,
  },
  deal: {
    plan_stages: Array<any>
  }
  PLACEMENT_OPTIONS: {
    ID?: string,
    [key: string]: any
  }
  token: string
  profile: {
    ID: string
    ADMIN: boolean,
    NAME: string
    LAST_NAME: string
    PERSONAL_GENDER: string
    PERSONAL_PHOTO: string
    TIME_ZONE: string
    TIME_ZONE_OFFSET: number
  }
}
