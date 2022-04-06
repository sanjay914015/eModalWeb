import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(public http: HttpClient) { }
  url = {
    "pay-data": "http://localhost:3000/pay-data",
    "containerWatchlist": "http://localhost:3000/status_details/"
  }

  delete(i: any) {return this.http.delete(this.url['containerWatchlist'] + i);}
  getData() {return this.http.get(this.url['pay-data']);}
  getConid(conid: any) {return this.http.get(`http://localhost:3000/status_details/?{conid}`);}
  getContainerWatchlist(){return this.http.get(this.url['containerWatchlist']);}
  getContainerById(id: any) {return this.http.get(this.url.containerWatchlist + "?con_id=" + id);}
}

