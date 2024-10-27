import {Component, AfterViewInit, OnInit} from '@angular/core';
import { TransactionsOverviewComponent } from './dashboard-components/sales-overview/transactions-overview.component';
import {Router} from "@angular/router";

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [TransactionsOverviewComponent],
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit, OnInit{

  public constructor(private router: Router) {
  }


  ngAfterViewInit() { }

  ngOnInit(): void {
    if(localStorage.getItem('jwtToken') === null) {
      this.router.navigate(['/auth/login']);
    }
  }

}
