import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

import { Usuario } from '../../models/usuario.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav)
  public sidenav!: MatSidenav;
  public user: Usuario = new Usuario();

  constructor(
    private _observer: BreakpointObserver,
    private _router: Router,
    private _userService: UserService
  ) { }  

  ngOnInit(): void {
    this.onLoadUserData();
  }

  ngAfterViewInit(): void {
    this._observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  onLoadUserData(): void {
    const id = localStorage.getItem('id') as unknown as number;

    this._userService.findById(id).subscribe((response) => {
      this.user = response;
    }, (err) => {
      console.log(err);
    });
  }

  onSignOut(): void {
    localStorage.clear();
    this._router.navigate(['login']);
  }

}
