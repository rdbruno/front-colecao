import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";
import { CollectionsRoutingModule } from "./collections-routing.module";

import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { CollectionsListComponent } from './collections-list/collections-list.component';

@NgModule({
  declarations: [
    CollectionDetailComponent,
    CollectionsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CollectionsRoutingModule
  ]
})
export class CollectionsModule { }