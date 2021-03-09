import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {OrderService} from '../orders.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCustomerModelComponent } from '../edit-customer-model/edit-customer-model.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  non_complete_orders = {};
  non_pending_orders = {};

  constructor(private spservice:OrderService,private modalService: NgbModal, private router: Router ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Orders' }, { label: 'All Orders', active: true }];
    // this.getAllOrders();
    this.getAllNonCompleteOrders();
    this.getAllNonPendingOrders();
  }

  getAllOrders()
  {
    this.spservice.getAllOrders().subscribe(resp => {
      // console.log(resp);
      this.sps = resp.data
    })
  }

  getAllNonCompleteOrders()
  {
    this.spservice.getAllNonCompleteOrders().subscribe(resp => {
      // console.log(resp);
      this.non_complete_orders = resp.data
    })
  }
  
  getAllNonPendingOrders()
  {
    this.spservice.getAllNonPendingOrders().subscribe(resp => {
      // console.log(resp);
      this.non_pending_orders = resp.data
    })
  }

  edit(id)
  {
    // this.modalService.open(EditCustomerModelComponent, {size: 'lg',windowClass:'modal-holder', centered: true });
    const modalRef = this.modalService.open(EditCustomerModelComponent, {size: 'lg', backdrop : 'static', keyboard: false });
    modalRef.componentInstance.id = id;
    modalRef.result.then((receivedEntry) => {
      this.getAllOrders();
    })
  }
  invoice(id)
  {
    // this.modalService.open(EditCustomerModelComponent, {size: 'lg',windowClass:'modal-holder', centered: true });
    // const modalRef = this.modalService.open(EditCustomerModelComponent, {size: 'lg', backdrop : 'static', keyboard: false });
    // modalRef.componentInstance.id = id;
    // modalRef.result.then((receivedEntry) => {
    //   this.getAllOrders();
    // })
    this.router.navigate(['invoice', { id }]);
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
