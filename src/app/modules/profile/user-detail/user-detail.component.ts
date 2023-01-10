import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Usuario } from 'src/app/shared/models/usuario.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public user: Usuario;

  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.onLoadProfile();
  }

  public onLoadProfile(): void {
    let email = localStorage.getItem('email') as string;

    this._userService.findByEmail(email).subscribe((response) => {
      this.user = response;
    }, (error) => {
      console.log(error);
      //this._snackBar.open(error.error.message, 'Ok', { duration: 3000 });
    });
  }

}
