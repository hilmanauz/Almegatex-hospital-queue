import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {
  customers: any = []
  references: any = []
  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.api.get('references').subscribe( result => {
      this.references = result
      return this.api.get('customers').subscribe( result => {
        this.customers = result
      })
    })
  }

}
