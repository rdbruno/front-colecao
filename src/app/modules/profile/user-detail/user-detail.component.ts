import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { UserDialogComponent, UserDialogModel } from '../user-dialog/user-dialog.component';

import { Usuario } from 'src/app/shared/models/usuario.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public user: Usuario = new Usuario();

  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.onLoadProfile();
  }

  public onLoadProfile(): void {
    let id = localStorage.getItem('id') as unknown as number;

    this._userService.findById(id).subscribe((response) => {
      this.user = response;
    }, (error) => {
      console.log(error);
      //this._snackBar.open(error.error.message, 'Ok', { duration: 3000 });
    });
  }

  public onEditProfile(): void {    
    const dialogData = new UserDialogModel('Dados do Usuário', this.user);
    const dialogRef  = this._dialog.open(UserDialogComponent, { maxWidth: '400px', data: dialogData });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.onLoadProfile();
        this._snackBar.open('Dados atualizados com Sucesso!', 'Ok', { duration: 3000 });
      }
    });
  }

}
