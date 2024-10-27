import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {LoginRoutes} from "./login.routing";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes)
  ]
})
export class LoginModule { }
