import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersModule} from "./pages/users/users.module";
import {NotFoundComponent} from "./pages/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: () => UsersModule
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
