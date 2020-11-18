import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {CustomerService} from '../customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCustomerModelComponent } from '../edit-customer-model/edit-customer-model.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-sp',
  templateUrl: './list-sp.component.html',
  styleUrls: ['./list-sp.component.scss']
})

/**
 * Basic table component
 */
export class ListSpComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  sps = {};

  constructor(private spservice:CustomerService,private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'All Customers', active: true }];
    this.spservice.getAllSP().subscribe(resp => {
      console.log(resp);
      this.sps = resp.data
    })
  }

  edit(id)
  {
    // this.modalService.open(EditCustomerModelComponent, {size: 'lg',windowClass:'modal-holder', centered: true });
    const modalRef = this.modalService.open(EditCustomerModelComponent, {size: 'lg', backdrop : 'static', keyboard: false });
    modalRef.componentInstance.id = id;
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
        this.spservice.postDeleteCustomer(id).subscribe( resp => {
          Swal.fire('Deleted!', 'Customer has been deleted.', 'success');
        }, err=>{ 
          console.log("err", err)
        });
      }
    });
  }
}
