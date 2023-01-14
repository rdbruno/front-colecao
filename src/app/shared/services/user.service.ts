import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalService } from "./global.service";

import { Usuario } from "../models/usuario.model";

@Injectable()
export class UserService {

  constructor(
    private _http: HttpClient,
    private _globalService: GlobalService
  ) { }

  public login(email: String, password: String): Observable<any> {
    let body = {
      "email": email,
      "senha": password
    }

    return this._http.post(`${this._globalService.getConfiguracao().urlApi}/login`, body);
  }

  public newUser(user: Usuario): Observable<any> {
    return this._http.post(`${this._globalService.getConfiguracao().urlApi}/usuarios`, user);
  }

  public updateUserById(nome: string, email: string, id: number): Observable<any> {
    let body = {
      "nome": nome,
      "email": email
    }

    return this._http.put(`${this._globalService.getConfiguracao().urlApi}/usuarios/${id}`, body);
  }

  public findById(id: number): Observable<any> {
    return this._http.get(`${this._globalService.getConfiguracao().urlApi}/usuarios/${id}`);
  }

  public findByEmail(email: string): Observable<any> {
    return this._http.get(`${this._globalService.getConfiguracao().urlApi}/usuarios/email?email=${email}`);
  }

}