import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContainerDataService } from '../container-data.service';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {

  constructor(private modalService: NgbModal, public ds: ContainerDataService, public fb: FormBuilder) { }

  containerFormData: any;
  container_Data: any;
  containerTypeData: any;
  postContainerData: any;
  status='';

  ngOnInit(): void {
    this.ds.getcontainerDetailsData("TI100001").subscribe((data) => this.fatchContainerData(data))
    this.ds.getcontainertypeData().subscribe((data) => this.fetchContainerType(data))


    this.containerFormData = this.fb.group({
      container_id: ['', Validators.required],
      container_type: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  EditContainerData(container:any)
  {
    console.log(container);

    if(container.status=='Available')
    {
      container.status='Not Available';
    }else{
      container.status='Available';
    }

    this.ds.putContainerDetailsData(container).subscribe((data) => console.log(data));
  }

  fetchContainerType(data: any) {
    this.containerTypeData = data;
    console.log(this.containerTypeData);
  }

  fatchContainerData(data: any) {
    this.container_Data = data;
    console.log(this.container_Data);

  }

  contype = '';

  containerData() {
    console.log(this.containerFormData);

    for (let i = 0; i < this.containerTypeData.length; i++) {
      if (this.containerFormData.value.container_type == this.containerTypeData[i].contype_type) {
        this.contype = this.containerTypeData[i].contype_id;
      }
    }


    this.postContainerData = {
      "id": ++(this.container_Data.length),
      "con_id": "CON00001",
      "contype_id": this.contype,
      "terminal_id_origin": "TI100001",
      "terminal_id_current": "TI100001",
      "status": this.containerFormData.value.status
    }

    console.log(this.postContainerData);
    this.ds.postContainerDetailsData(this.postContainerData).subscribe((data) => console.log(data));

  }

  closeResult = '';
  open(content: any) {

    // const modalRef = this.modalService.open(ModelComponent, { size: 'sm', backdrop: 'static' });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

}
