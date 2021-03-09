import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {CustomerService} from '../customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCustomerModelComponent } from '../edit-customer-model/edit-customer-model.component';
import Swal from 'sweetalert2';
import { EditExerciseModelComponent } from '../edit-exercise-model/edit-exercise-model.component';

@Component({
  selector: 'app-list-exercise',
  templateUrl: './list-exercise.component.html',
  styleUrls: ['./list-exercise.component.scss']
})

/**
 * Basic table component
 */
export class ListExerciseComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  sps = {};

  constructor(private spservice:CustomerService,private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'All Customers', active: true }];
    
    this.loadData();
  }

  loadData(){
    this.spservice.getAllExercises().subscribe(resp => {
      console.log(resp);
      this.sps = resp.data
    })
  }

  
  edit(id)
  {
    // this.modalService.open(EditCustomerModelComponent, {size: 'lg',windowClass:'modal-holder', centered: true });
    const modalRef = this.modalService.open(EditExerciseModelComponent, {size: 'lg', backdrop : 'static', keyboard: false });
    modalRef.componentInstance.id = id;
    modalRef.result.then((receivedEntry) => {
      console.log("received",receivedEntry);
      this.loadData();
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
        this.spservice.postDeleteExercise(id).subscribe( resp => {
          Swal.fire('Deleted!', 'Exercise has been deleted.', 'success');
          this.loadData();
        }, err=>{ 
          console.log("err", err)
        });
      }
    });
  }
}
