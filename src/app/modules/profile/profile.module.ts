import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";

import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }