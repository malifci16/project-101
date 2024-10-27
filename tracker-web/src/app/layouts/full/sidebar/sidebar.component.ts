import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { BudgetTrackerModule } from 'src/app/budget-tracker-module';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[BudgetTrackerModule, NgFor, NgIf, RouterModule, CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  loggedInUser: string | null = localStorage.getItem('name');

  private _mobileQueryListener: () => void;
  public isUserLoggedIn: boolean;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isUserLoggedIn = localStorage.getItem('userId') != null;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public doLogOut(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    location.reload();
  }
}
