import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BudgetTrackerModule} from "../budget-tracker-module";
import {RouterModule} from "@angular/router";
import {TransactionsRoutes} from "./transactions.routing";
import {TransactionsComponent} from "./transactions.component";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  imports: [
    CommonModule,
    BudgetTrackerModule,
    RouterModule.forChild(TransactionsRoutes),
    TransactionsComponent,
    MatSortModule,
    MatTableModule
  ],
})
export class TransactionsModule { }
