import { Injectable } from "@angular/core";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class UtilApi {

  constructor(
    private _globalService: GlobalService
  ) { }

  invocacaoRemotaComRetry(repetitions: number, timeout: number, object: any, funcao: () => any): any {
    if (repetitions > 0) {
      try {
        return funcao.call(object);
      } catch (error) {
        setTimeout(() => {
          return this.invocacaoRemotaComRetry(repetitions -1, timeout, object, funcao);
        }, 1000);
      }
    } else {
      return null;
    }
  }

}