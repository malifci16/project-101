import {AfterViewInit, Component, Injectable, ViewChild} from '@angular/core';
import { MatTableModule} from "@angular/material/table";
import {MatSortModule, SortDirection} from "@angular/material/sort";
import {ViewTransactionsComponent} from "./view-transactions/view-transactions.component";
import {AddTransactionComponent} from "./add-transaction/add-transaction.component";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth-service";
import {TransactionsHttpService} from "../../services/transactions-service";
import {MatDialog} from "@angular/material/dialog";
import {DialogOverviewExampleDialogComponent} from "../material-component/dialog/dialog.component";

export interface TransactionType {
  value: string;
  name: string;
}

export interface Transaction {
  id?: number,
  type: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    MatTableModule, MatSortModule, ViewTransactionsComponent, AddTransactionComponent
  ],
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements AfterViewInit {

  @ViewChild('viewTransactionsComponent') viewTransactionsComponent: ViewTransactionsComponent | undefined;

  public constructor( public dialog: MatDialog, private transactionsService: TransactionsHttpService,) {
  }


  ngAfterViewInit(): void {
  }

  public deleteTransaction(transactionId: string) {
    /*const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '80%',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
    debugger
        //this.transactionsService.deleteExistingTransaction(transactionId).subscribe(response => {
          //this.snackBar.open('Transaction with Id ' + transactionId + ' Deleted Successfully', 'Done', {
          //  duration: 2000,
          //});
        //});
    });*/
  }

}
