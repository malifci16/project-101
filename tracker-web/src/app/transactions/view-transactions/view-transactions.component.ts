import { Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatPaginator} from "@angular/material/paginator";
import {Transaction, TransactionsComponent} from "../transactions.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {TransactionsHttpService} from "../../../services/transactions-service";
import {NgIf} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'view-transactions',
  standalone: true,
  templateUrl: './view-transactions.component.html',
  styleUrl: './view-transactions.component.scss',
  imports: [MatTableModule, MatSortModule, MatCard, MatCardContent, MatPaginator, MatProgressSpinner, NgIf, MatToolbar, MatFormField, MatLabel, MatIcon, MatIconButton, MatFabButton],
})
export class ViewTransactionsComponent implements OnInit  {

  displayedColumns: string[] = ['id', 'type', 'amount', 'date'];
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();
  isLoadingResults = true;
  isRateLimitReached = false;
  @Input() parent: TransactionsComponent | undefined;

  public constructor(private transactionsService: TransactionsHttpService) {
  }

  ngOnInit(): void {
    this.loadAllTransaction();
  }


  public loadAllTransaction() {
    this.transactionsService.getCurrentUserTransactions().subscribe(response => {
      this.dataSource.data = response;
      this.isLoadingResults = false;
    });
  }
}
