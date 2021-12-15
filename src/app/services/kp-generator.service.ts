import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
// import {iB24User} from "../shared/model/i-b24-user";

@Injectable({
  providedIn: 'root'
})
export class KpGeneratorService {

  private moduleId = "szgm";

  constructor(
    private bs: BackendService
  ) { }

 /* iLoadManagerResponse не работает
  loadManagerData() {
     return this.bs.get<iLoadManagerResponse>(this.moduleId, 'manager')
  } */

  loadPresets(){
     return this.bs.get(this.moduleId, 'presets')
  }

  generate(value: any) {
      return this.bs.post<any>(this.moduleId, 'generate', value)
  }
}

/* export interface iLoadManagerResponse {
  manager: iB24User
} */
