import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BudgetTrackerModule } from 'src/app/budget-tracker-module';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  standalone: true,
  imports: [BudgetTrackerModule, FormsModule, NgIf, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  template: `<h1 mat-dialog-title>Are you sure you want to delete this transaction ?</h1>
<div mat-dialog-actions>
  <button mat-button class="mat-primary" [mat-dialog-close]="data.animal" tabindex="2">Yes</button>
  <button mat-button class="mat-warn" (click)="onNoClick()" tabindex="-1">No Thanks</button>
</div>`
})
export class DialogOverviewExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DialogOverviewExampleDialogComponent, BudgetTrackerModule, NgIf, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  animal: string = '';
  name: string = '';

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
