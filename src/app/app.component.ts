import { Component, OnInit } from '@angular/core';
import { GlobalService } from './shared/services/global.service';
import { UtilApi } from './shared/services/util.api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'colecao';

  constructor(
    public globalService: GlobalService,
    private _utilApi: UtilApi
  ) { }

  ngOnInit(): void {
    this._utilApi.invocacaoRemotaComRetry(5, 1000, this, AppComponent.prototype.carregarConf);
  }

  carregarConf(): void {
    this.globalService.carregarConf();
  }
  
}
