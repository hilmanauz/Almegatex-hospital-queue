import { Component, DoCheck } from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'testing-app';
  pathname = '';
  isNavbar = null;
    constructor (private location: Location) {
  }

  ngDoCheck(): void {
    this.pathname = this.location['_platformLocation'].location.pathname;
    if(this.pathname === '/input-visitor-details' || this.pathname === '/visitor-list'){
      this.isNavbar = true
    } else {
      this.isNavbar = false
    }
  }

}
