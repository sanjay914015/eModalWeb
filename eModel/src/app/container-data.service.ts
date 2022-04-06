import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContainerDataService {

  constructor(public ht: HttpClient) { }
  gtcontainerDetailsData = " http://localhost:3000/container_details?terminal_id_origin=";
  containertype_details= " http://localhost:3000/containertype_details/";
  containerDetailsData = "http://localhost:3000/containertype_details/";

  getcontainerDetailsData(terminal_name:string)
  {
    return this.ht.get(this.gtcontainerDetailsData+terminal_name);
  }
  getcontainertypeData()
  {
    return this.ht.get(this.containertype_details);
  }
  postContainerDetailsData(data:any)
  {
    return this.ht.post(this.containerDetailsData, data);
  }
  putContainerDetailsData(data:any) {
    return this.ht.put(this.containerDetailsData+data.id, data);
  }

}
