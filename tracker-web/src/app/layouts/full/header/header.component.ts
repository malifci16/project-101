import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  public isUserLoggedIn: boolean;

  constructor(private router: Router) {
    this.isUserLoggedIn = localStorage.getItem('userId') != null;
  }


  public doLogOut(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    location.reload();
  }

}
