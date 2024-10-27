import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BudgetTrackerModule } from '../budget-tracker-module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    BudgetTrackerModule,
    RouterModule.forChild(DashboardRoutes),
    DashboardComponent,
  ],
})
export class DashboardModule { }
