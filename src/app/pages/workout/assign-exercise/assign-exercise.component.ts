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

    // this.spservice.getAllExercises().subscribe(resp => {
    //   this.existingExercises = resp.data
    // })
    
    this.spservice.getAllWP().subscribe(resp => {
      this.wps = resp.data

    })

  }

  getAssignedExercised()
  {
    this.existingExercises = null;
    this.spservice.getAllWPExercises(this.wpid).subscribe( resp => {
      if(resp.success)
        this.existingExercises = resp.data;
        
    }, err=>{ 
      
    });

  }

  // ifexists(id)
  // {
  //   let x = this.existingExercises.indexOf(id);
  //   if(x < 0)
  //     return false;
  //   else 
  //     return true;
  // }

  assign(event, eid)
  {
    // console.log(event);
    // console.log(eid);
    if(this.wpid)
    {
      if(event.target.checked)
      {
        this.ajax(eid);      
      }
      else 
      {
        this.spservice.postUnAssignExercise(this.wpid, eid).subscribe( resp => {
          
        }, err=>{ 
          
        });
      }
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Select Workout Program'
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

  ajax(eid) {
    Swal.fire({
      title: 'Enter Position',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#556ee6',
      cancelButtonColor: '#f46a6a',
      preConfirm: position => {
        // eslint-disable-next-line no-unused-vars
        /*return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (email === 'taken@example.com') {
              Promise.reject(new Error('This email is already taken.'));
            } else {
              resolve();
            }
          }, 2000);
        });*/
        if (position > 0)
        {
          this.spservice.postAssignExercise(this.wpid, eid,position).subscribe( resp => {
          
          }, err=>{ 
            
          });
        }
        else {
          Swal.fire({
            title: 'Error',
            html: 'Enter position something bigger than zero'
          });

        }
      },
      allowOutsideClick: false
    }).then(position => {
      console.log(position);
      Swal.fire({
        title: 'Assigned!',
        html: 'Saved'
      });
    });
  }
}
