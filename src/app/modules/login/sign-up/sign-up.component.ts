import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public formSignUp = this._formBuilder.group({
    name: [null, [ Validators.required ]],
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

  public onSignUp(): void {

  }

  public onSignInPage(): void {
    this._router.navigate(['login/signin']);
  }

}
