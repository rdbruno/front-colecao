import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

import { UserService } from 'src/app/shared/services/user.service';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public dataAtual = new Date();
  public dataMoment = moment(this.dataAtual, 'YYYY-MM-DD');
  public dataCadastro = this.dataMoment.format('YYYY-MM-DD');

  public formSignUp = this._formBuilder.group({
    name: [null, [ Validators.required, Validators.minLength(5), Validators.maxLength(200) ]],
    email: [null, [ Validators.required, Validators.email ]],
    password: [null, [ Validators.required ]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public onSignUp(): void {
    const user: Usuario = new Usuario;
    user.nome = this.formSignUp.value.name;
    user.email = this.formSignUp.value.email;    
    user.senha = this.formSignUp.value.password;
    user.dataCadastro = this.dataCadastro;

    this._userService.newUser(user).subscribe((response) => {
      this._snackBar.open('Cadastro realizado com Sucesso!', 'Ok', { duration: 3000 });
      this._router.navigate(['login/signin']);
    }, (error) => {
      this._snackBar.open(error.error.errors[0].fieldName + ' - ' + error.error.errors[0].message, 'Ok', { duration: 3000 });
    });

  }

  public onSignInPage(): void {
    this._router.navigate(['login/signin']);
  }

}
