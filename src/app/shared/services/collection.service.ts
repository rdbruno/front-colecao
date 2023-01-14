import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalService } from "./global.service";

import { Colecionavel } from "../models/colecionavel.model";

@Injectable()
export class CollectionService {

  constructor(
    private _http: HttpClient,
    private _globalService: GlobalService
  ) { }

  public newItem(colecionavel: Colecionavel): Observable<any> {
    return this._http.post(`${this._globalService.getConfiguracao().urlApi}/colecionaveis`, colecionavel);
  }

  public findById(id: number): Observable<any> {
    return this._http.get(`${this._globalService.getConfiguracao().urlApi}/colecionaveis/${id}`);
  }

  public listCollectionsByUser(usuario: number): Observable<any> {
    return this._http.get(`${this._globalService.getConfiguracao().urlApi}/colecionaveis/usuario?usuarioPesquisa=${usuario}`);
  }

  public listCollectionsByUserName(usuario: number, name: string): Observable<any> {
    return this._http.get(`${this._globalService.getConfiguracao().urlApi}/colecionaveis/nome?usuarioPesquisa=${usuario}&nomePesquisa=${name}`);
  }

  public listCollectionsByUserCategory(usuario: number, category: string): Observable<any> {
    return this._http.get(`${this._globalService.getConfiguracao().urlApi}/colecionaveis/categoria?usuarioPesquisa=${usuario}&categoriaPesquisa=${category}`);
  }

}