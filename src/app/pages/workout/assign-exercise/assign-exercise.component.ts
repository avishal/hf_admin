import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {CustomerService} from '../customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCustomerModelComponent } from '../edit-customer-model/edit-customer-model.component';
import Swal from 'sweetalert2';
import { EditExerciseModelComponent } from '../edit-exercise-model/edit-exercise-model.component';

@Component({
  selector: 'app-assign-exercise',
  templateUrl: './assign-exercise.component.html',
  styleUrls: ['./assign-exercise.component.scss']
})

/**
 * Basic table component
 */
export class AssignExerciseComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  wps = {};
  sps = {};
  wpid = "";
  existingExercises = [];
  constructor(private spservice:CustomerService,private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'All Customers', active: true }];

    this.spservice.getAllExercises().subscribe(resp => {
      this.sps = resp.data
    })
    
    this.spservice.getAllWP().subscribe(resp => {
      this.wps = resp.data

    })

  }

  getAssignedExercised()
  {
    this.spservice.getAssignedExercise(this.wpid).subscribe( resp => {
      if(resp.success)
        this.existingExercises = resp.data;
        
    }, err=>{ 
      
    });

  }

  ifexists(id)
  {
    let x = this.existingExercises.indexOf(id);
    if(x < 0)
      return false;
    else 
      return true;
  }

  assign(event, eid)
  {
    // console.log(event);
    // console.log(eid);

    if(event.target.checked)
    {

      this.spservice.postAssignExercise(this.wpid, eid).subscribe( resp => {
        
      }, err=>{ 
        
      });
    }
    else 
    {
      this.spservice.postUnAssignExercise(this.wpid, eid).subscribe( resp => {
        
      }, err=>{ 
        
      });
    }
  }

  /*edit(id)
  {
    // this.modalService.open(EditCustomerModelComponent, {size: 'lg',windowClass:'modal-holder', centered: true });
    const modalRef = this.modalService.open(EditExerciseModelComponent, {size: 'lg', backdrop : 'static', keyboard: false });
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
        this.spservice.postDeleteExercise(id).subscribe( resp => {
          Swal.fire('Deleted!', 'Exercise has been deleted.', 'success');
        }, err=>{ 
          console.log("err", err)
        });
      }
    });
  }*/
}
