import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";
import { NewRoutingModule } from "./new-routing.module";

import { NewItemComponent } from './new-item/new-item.component';

@NgModule({
  declarations: [
    NewItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewRoutingModule
  ]
})
export class NewModule { }