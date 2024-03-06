import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'recepies',pathMatch:'full'},
  {path: 'recepies',loadChildren: ()=> import('./recepies/recepies.module').then(m=>m.RecepiesModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
