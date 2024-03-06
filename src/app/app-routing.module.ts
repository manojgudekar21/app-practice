import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'recepies',pathMatch:'full'},
  {path: 'recepies',loadChildren: ()=> import('./recepies/recepies.module').then(m=>m.RecepiesModule)},
  {path: 'shopping-list', loadChildren: ()=>import('./shopping-list/shopping-list.module').then(m=>m.ShoppingListModule)},
  {path: 'auth', loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
