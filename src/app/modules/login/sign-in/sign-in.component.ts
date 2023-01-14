import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public formLogin = this._formBuilder.group({
    email: [null, [ Validators.required, Validators.email ]],
    password: [null, [ Validators.required ]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  public onSignIn(): void {
    this._userService.login(this.formLogin.value.email, this.formLogin.value.password).subscribe((response) => {
      if (response.accessToken) {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('id', response.id);
        this._router.navigate(['menu']);
      } else {
        this._snackBar.open('Usuário não encontrado!', 'Ok', { duration: 3000 });
      }   
    }, (error) => {
      this._snackBar.open(error.error.message, 'Ok', { duration: 3000 });
    });    
  }

  public onSignUpPage(): void {
    this._router.navigate(['login/signup']);
  }

}
