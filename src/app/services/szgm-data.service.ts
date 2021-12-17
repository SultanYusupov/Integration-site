import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {iDealStagesListResponse} from "./application.service";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SzgmDataService {

  constructor(
    private bs: BackendService
  ) { }

  saveAdministrative(params: any, title: any, dealDateCreate: any) {
    return this.bs.post<any>('szgm', 'administrative.save', {
      stages: params,
      title: title,
      dealDateCreate: dealDateCreate
    })
  }

   loadDealStages() {
    return this.bs.get<iDealStagesListResponse>('szgm', 'deal.stages.list')
  }

  saveProductionFields(params: any, title: any, dealDateCreate: any) {
    return this.bs.post<any>('szgm', 'production.save', {
      stages: params,
      title: title,
      dealDateCreate: dealDateCreate
    })
  }

  loadProjectByFilter(start: any, end: any, deals: any) {
    return this.bs.post<any>('szgm', 'get.excel.data', {start, end, deals})
  }
}
