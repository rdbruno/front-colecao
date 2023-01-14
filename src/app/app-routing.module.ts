import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './shared/gaurds/login-guard';

import { MenuComponent } from './shared/components/menu/menu.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [ LoginGuard ],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'colecoes' },
      {
        path: 'colecoes',
        loadChildren: () => import('./modules/collections/collections.module').then(m => m.CollectionsModule)
      },
      {
        path: 'novo',
        loadChildren: () => import('./modules/new/new.module').then(m => m.NewModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
