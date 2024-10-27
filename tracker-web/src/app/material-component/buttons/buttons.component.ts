import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BudgetTrackerModule } from 'src/app/budget-tracker-module';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [BudgetTrackerModule, MatButtonModule],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  constructor() { }
}
