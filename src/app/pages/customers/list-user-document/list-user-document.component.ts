import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {CustomerService} from '../customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCustomerDocumentModelComponent } from '../edit-customer-document-model/edit-customer-document-model.component';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-user-document',
  templateUrl: './list-user-document.component.html',
  styleUrls: ['./list-user-document.component.scss']
})

/**
 * Basic table component
 */
export class ListUserDocumentComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  userDocs = [];
  user_id = 0;

  constructor(private spservice:CustomerService, private modalService: NgbModal, private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'All Customer Documents', active: true }];
    this.user_id = parseInt(this._Activatedroute.snapshot.paramMap.get("id"));
    this.getData();
  }

  getData(){
    this.spservice.getAllUserDocuments(this.user_id).subscribe(resp => {
      console.log(resp);
      this.userDocs = resp.data
    })
  }

  edit(id)
  {
    // this.modalService.open(EditCustomerModelComponent, {size: 'lg',windowClass:'modal-holder', centered: true });
    const modalRef = this.modalService.open(EditCustomerDocumentModelComponent, {size: 'lg', backdrop : 'static', keyboard: false });
    modalRef.componentInstance.id = id;
    modalRef.result.then((receivedEntry) => {
      console.log("received",receivedEntry);
      this.getData();
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
        this.spservice.postDeleteCustomerDocument(id).subscribe( resp => {
          Swal.fire('Deleted!', 'Customer Document has been deleted.', 'success');
          this.getData();
        }, err=>{ 
          console.log("err", err)
        });
      }
    });
  }
}
