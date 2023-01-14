import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CollectionsListComponent } from "./collections-list/collections-list.component";
import { CollectionDetailComponent } from "./collection-detail/collection-detail.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'colecionaveis' },
  { path: 'colecionaveis', component: CollectionsListComponent },
  { path: 'detalhes/:id', component: CollectionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }