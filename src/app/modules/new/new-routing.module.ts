import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NewItemComponent } from "./new-item/new-item.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'item' },
  { path: 'item', component: NewItemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }