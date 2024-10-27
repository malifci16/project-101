import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction} from "../app/transactions/transactions.component";

@Injectable({
  providedIn: 'root'
})
export class TransactionsHttpService {

  private apiUrl = 'http://localhost:30001';  // NodePort URL


  constructor(private http: HttpClient) {}

  getCurrentUserTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl + `/budget-tracker/api/users/${localStorage.getItem('userId')}/transactions`);
  }

  addNewTransaction(transaction: Transaction): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(this.apiUrl + `/budget-tracker/api/users/${localStorage.getItem('userId')}/transactions`, transaction);
  }

  deleteExistingTransaction(transactionId: string): Observable<Transaction[]> {
    return this.http.delete<Transaction[]>(this.apiUrl + `/budget-tracker/api/users/${localStorage.getItem('userId')}/transactions/${transactionId}`);
  }
}
