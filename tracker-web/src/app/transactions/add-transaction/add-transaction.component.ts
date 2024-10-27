import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatButton} from "@angular/material/button";
import {MatAccordion, MatExpansionPanelActionRow} from "@angular/material/expansion";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import * as _moment from 'moment';
import {MatDivider} from "@angular/material/divider";
import {DatePipe, NgIf} from "@angular/common";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatOption, MatSelect} from "@angular/material/select";
import {Transaction, TransactionsComponent, TransactionType} from "../transactions.component";
import {TransactionsHttpService} from "../../../services/transactions-service";
import {MatSnackBar} from "@angular/material/snack-bar";

const moment = _moment;

@Component({
  selector: 'add-transaction',
  providers: [
    provideMomentDateAdapter(),
  ],
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatCardFooter,
    MatButton,
    MatCardHeader,
    MatExpansionPanelActionRow,
    MatAccordion,
    MatFormField,
    MatInput,
    MatSelectionList,
    MatListOption,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatHint,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDivider,
    NgIf,
    DatePipe,
    MatRadioGroup,
    MatRadioButton,
    MatSelect,
    MatOption,
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent implements OnInit, AfterViewInit {

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,
              private transactionsService: TransactionsHttpService) {
    this.transactionForm = this.formBuilder.group({
      date: [null, [Validators.required, this.dateRangeValidator.bind(this)]],
      type: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]]
    });
  }
  transactionForm: FormGroup;
  transactionTypes: TransactionType[] = [
    {value: 'EXPENSE', name: 'Expense'},
    {value: 'INCOME', name: 'Income'},
  ];
  minDate: Date | undefined;
  maxDate: Date | undefined;
  @Input() parent: TransactionsComponent | undefined;

  ngOnInit(): void {
    this.setDateBounds();
  }

  ngAfterViewInit(): void {
  }

  public clearForm(): void {
    this.transactionForm.reset();
  }

  public createTransaction(): void {
    if(this.transactionForm.valid) {
      let newTransaction : Transaction = {
        amount: this.transactionForm.get('amount')?.value,
        type: this.transactionForm.get('type')?.value,
        date:  moment(this.transactionForm.get('date')?.value).format('YYYY.MM.DD')
      };
      this.transactionsService.addNewTransaction(newTransaction).subscribe(response => {
        if(this.parent)
          this.parent.viewTransactionsComponent?.loadAllTransaction();
        this.snackBar.open('New Transaction Added Successfully', 'Done', {
          duration: 2000,
        })._dismissAfter(2000);
        this.clearForm();
        this.transactionForm.clearValidators();
      });
    } else {
      this.transactionForm.markAllAsTouched();
    }
  }


  // Set the minimum and maximum dates
  setDateBounds(): void {
    const currentDate = new Date();
    // Set minDate to the current date or the first day of the month
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Set maxDate to the last day of the current month
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Last day of the current month
  }
  // Custom Validator to Check Date Range
  dateRangeValidator(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate: Date = control.value;
    if (selectedDate) {
      // @ts-ignore
      if (selectedDate < this.minDate) {
        return { 'minDate': { value: selectedDate } };
      }
      // @ts-ignore
      if (selectedDate > this.maxDate) {
        return { 'maxDate': { value: selectedDate } };
      }
    }
    return null;
  }

}
