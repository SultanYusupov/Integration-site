import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {map} from "rxjs/operators";
// import {iB24SettingsUserAsset} from "../shared/model/i-b24-settings-user-asset";
// import {iB24SettingsUserAsset as B24User2} from "../shared/model/i-b24-user";// импорт 2х  интерфейсов с одним именем

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: iSettings | undefined;
  private moduleId = "szgm";
  // private moduleId = 'kp-generator';

  constructor(
    private bs: BackendService
  ) { }


  loadSettings(){
    return this.bs.get<iSettings>(this.moduleId, 'settings')
      .pipe(map(response => {
        console.log(response)
        this.settings = response
        return response
      }))
  }

   /* placementOn(code: string) {
    return this.bs.post<{
      result: boolean
    }>(this.moduleId, 'placement.on', {
      code: code
    })
      .pipe(map(response => {
        return response
      }))
  }*/

  placementOn(inputValue: any) {
    return this.bs.post<{
      result: boolean
    }>(this.moduleId, 'placement.on', inputValue)
      .pipe(map(response => {
        return response
      }))
  }

  placementOff(code: string) {
    return this.bs.post<{
      result: boolean
    }>(this.moduleId, 'placement.off', {
      code: code
    })
      .pipe(map(response => {
        return response
      }))
  }

  robotOff(code: any) {
    return this.bs.post<{
      result: boolean
    }>(this.moduleId, 'robot.off', {
      code: code
    })
      .pipe(map(response => {
        return response
      }))
  }
  robotOn(code: any) {
    return this.bs.post<{
      result: boolean
    }>(this.moduleId, 'robot.on', {
      code: code
    })
      .pipe(map(response => {
        return response
      }))
  }

  activityOff(code: any) {
    return this.bs.post<{
      result: boolean
    }>(this.moduleId, 'activity.off', {
      code: code
    })
      .pipe(map(response => {
        return response
      }))
  }
  activityOn(code: any) {
    return this.bs.post<{
      result: boolean
    }>(this.moduleId, 'activity.on', {
      code: code
    })
      .pipe(map(response => {
        return response
      }))
  }

  /* так как iB24SettingsUserAsset нет, я закомментировал эту функцию
   loadUsersSettings() {
    return this.bs.get<{
      b24users: Array<iB24SettingsUserAsset>
    }>(this.moduleId, "users.settings")
  } */

  disableUser(ID: string) {
    return this.bs.post<{
      result: boolean
    }>(this.moduleId, 'user.disable', {
      id: ID
    })
  }
  enableUser(ID: string, FULL_NAME: string) {
    return this.bs.post<{
      result: boolean
    }>(this.moduleId, 'user.enable', {
      id: ID,
      name: FULL_NAME
    })
  }

  updateUsersPermissions(value: any) {
    return this.bs.post<{
      result: boolean,
      errors: Array<string>
    }>(this.moduleId, 'user.permissions.update', value)
  }

}

export interface iSettings {
  placements: Array<iPlacement>,
  robots: Array<iB24Robot>,
  activities: Array<iB24Activity>
  settings: {
    user_permissions: {
      edit_administrative: Array<string>,
      edit_production: Array<string>
        update_receivers: Array<string>
    }
  }
}
export interface iB24Robot {
  code: string
  state: boolean
  description: string
  name: string
  properties: Array<any>
}
export interface iB24Activity extends iB24Robot{
  return_properties: {
    [returnValieCode: string]: {
      Description: string
      Multiple: "Y" | "N"
      Name: string
      Required: "Y" | "N"
      Type: string
    }
  }
}
export interface iPlacement {
  position: string
  code: string
  state: boolean
}
