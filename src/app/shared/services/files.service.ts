import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalService } from "./global.service";

@Injectable()
export class FilesService {

  constructor(
    private _http: HttpClient,
    private _globalService: GlobalService
  ) { }

  public upload(id: number, arquivo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', arquivo);
    formData.append('colecionavel', id.toString());
    return this._http.post(`${this._globalService.getConfiguracao().urlApi}/imagem/upload`, formData);
  }

}