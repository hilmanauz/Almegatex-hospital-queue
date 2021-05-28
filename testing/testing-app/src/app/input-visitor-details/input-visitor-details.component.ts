import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css']
})
export class InputVisitorDetailsComponent implements OnInit {
  firstName = "";
  lastName = "";
  contact = "";
  email = "";
  isBpjs = "";
  reference = "";
  references:any = [];

  constructor(
    public api: ApiService,
    ) {
    
  }

  ngOnInit(): void {
    this.api.get('references').subscribe( result => {
      this.references = result
    })
  }

  submit(){
    var customer = {firstName: this.firstName, lastName: this.lastName, contact: this.contact, email: this.email, bpjs: this.isBpjs, reference: this.reference, isQueue: false, date: new Date()} 
    var filterReference = this.references.filter(reference => reference.id === this.reference)[0];
    filterReference.count += 1;
    this.createQueueNumber(customer)
    this.api.post('customers', customer).subscribe(_ => {
      return this.api.patch(`references/${customer.reference}`, filterReference).subscribe()
    })
    this.firstName = "";
    this.lastName = "";
    this.contact = "";
    this.email = "";
    this.isBpjs = "";
    this.reference = "";
  }

  createQueueNumber(customer) {
    const idReference = this.references.find(reference => reference.id === customer.reference);
    let queue = '';
    if(idReference.count < 10){
      queue = `${idReference.initial}00${idReference.count}`
    } else if(idReference.count >=10 && idReference.count <= 99){
      queue = `${idReference.initial}0${idReference.count}`
    } else {
      queue = `${idReference.initial}${idReference.count}`
    }
    customer.queue = queue;
  }

}
