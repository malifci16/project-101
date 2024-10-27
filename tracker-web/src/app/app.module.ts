
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetTrackerModule } from './budget-tracker-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import {TransactionsHttpService} from "../services/transactions-service";
import {authInterceptorFunctional} from "../services/jwt-auth.interceptor";
import {AuthService} from "../services/auth-service";

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BudgetTrackerModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    AppSidebarComponent],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptorFunctional]) // Register the interceptor with HttpClient
    ), {
      provide: [LocationStrategy, TransactionsHttpService, AuthService],
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
