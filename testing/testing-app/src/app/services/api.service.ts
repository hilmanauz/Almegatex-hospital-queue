import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl:any= 'http://localhost:3000/'
  constructor(public http:HttpClient) {
  }

  get(url){
    return this.http.get(this.serverUrl+url);
  }

  post(url, data){
    return this.http.post(this.serverUrl+url, data);
  }

  patch(url, data){
    return this.http.patch(this.serverUrl+url, data);
  }
}
