import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { BudgetTrackerModule } from 'src/app/budget-tracker-module';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [BudgetTrackerModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent { }
