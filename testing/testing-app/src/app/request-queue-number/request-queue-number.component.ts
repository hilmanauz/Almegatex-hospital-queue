import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-request-queue-number',
  templateUrl: './request-queue-number.component.html',
  styleUrls: ['./request-queue-number.component.css']
})
export class RequestQueueNumberComponent implements OnInit {
  customers: any = []
  customer: any = {}
  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.api.get('customers').subscribe( result => {
      this.customers = result
      var queueNumber = this.customers.filter(customer => customer.isQueue === false)
      if(queueNumber.length === 0){
        this.customer = this.customers[this.customers.length-1]
      } else {
        queueNumber[0].isQueue = true
        this.customer = queueNumber[0]
        return this.api.patch(`customers/${queueNumber[0].id}`, queueNumber[0]).subscribe()      
      }
      if(this.customer.id){
        window.focus();
        setTimeout(() => {
          window.print();
        }, 400);
      }
    })
  }

}
