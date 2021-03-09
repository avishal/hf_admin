import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {OperatingRegionsService} from '../operating-regions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditLvModelComponent } from '../edit-lv-model/edit-lv-model.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-livevideos',
  templateUrl: './list-livevideos.component.html',
  styleUrls: ['./list-livevideos.component.scss']
})

/**
 * Basic table component
 */
export class ListLivevideosComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  sps = {};

  constructor(private spservice:OperatingRegionsService,private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'All Customers', active: true }];
    this.spservice.getLiveVideos().subscribe(resp => {
      console.log(resp);
      this.sps = resp.data
    })
  }

  edit(id)
  {
    // this.modalService.open(EditCustomerModelComponent, {size: 'lg',windowClass:'modal-holder', centered: true });
    const modalRef = this.modalService.open(EditLvModelComponent, {size: 'lg', backdrop : 'static', keyboard: false });
    modalRef.componentInstance.id = id;
    modalRef.result.then((receivedEntry) => {
      console.log("received",receivedEntry);
    })
  }
  
  delete(id)
  {
    this.confirm(id);
    
  }

  confirm(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.spservice.deleteLiveVideo(id).subscribe( resp => {
          Swal.fire('Deleted!', 'video has been deleted.', 'success');
        }, err=>{ 
          console.log("err", err)
        });
      }
    });
  }
}
