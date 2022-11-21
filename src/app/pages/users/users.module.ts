import {NgModule} from '@angular/core';
import {UserEditComponent} from "./user-edit/user-edit.component";
import {UsersRoutingModule} from "./users-routing.module";
import {UsersComponent} from "./users.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    UsersComponent,
    UserEditComponent
  ],
  imports: [
    UsersRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ]
})
export class UsersModule { }
