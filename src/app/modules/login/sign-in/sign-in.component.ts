import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  public onSignIn(): void {
    this._router.navigate(['menu']);
  }

  public onSignUpPage(): void {
    this._router.navigate(['login/signup']);
  }

}
