import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import {authGuard} from "../services/auth.guard";

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [authGuard]
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule),
        canActivate: [authGuard]
      },
      {
        path: 'auth',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      }
    ]
  }
];
