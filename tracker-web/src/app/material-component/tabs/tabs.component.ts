import {Component} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BudgetTrackerModule } from 'src/app/budget-tracker-module';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports:[BudgetTrackerModule, MatTabsModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

}
