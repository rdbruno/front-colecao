import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Usuario } from 'src/app/shared/models/usuario.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  public title: string;
  public user: Usuario;

  public formUser = this._formBuilder.group({
    nome: [null, [ Validators.maxLength(200) ]],
    email: [null, [ Validators.maxLength(150), Validators.email ]]
  });

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogComponent,
    private _formBuilder: FormBuilder,
    private _userService: UserService    
  ) {
    this.title = data.title;
    this.user = data.user;
  }

  ngOnInit(): void {
    this.onLoadProfile();
  }

  public onLoadProfile(): void {
    this.formUser.setValue({ nome: this.user.nome, email: this.user.email });
  }

  public onDismiss(): void {
    this.dialogRef.close(false);
  }

  public onEditUser(): void {    
    this._userService.updateUserById(this.formUser.value.nome, this.formUser.value.email, this.user.id).subscribe((response) => {
      this.dialogRef.close(true);
    }, (error) => {
      console.log(error);
    });    
  }

}

export class UserDialogModel {

  constructor(public title: string, public user: Usuario) { }

}