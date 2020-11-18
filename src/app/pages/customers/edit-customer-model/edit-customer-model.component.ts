import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import {CustomerService} from '../customer.service';
@Component({
  selector: 'app-edit-customer-model',
  templateUrl: './edit-customer-model.component.html',
  styleUrls: ['./edit-customer-model.component.scss']
})

/**
 * Basic table component
 */
export class EditCustomerModelComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  sps = {};
  id;
  constructor(public formBuilder: FormBuilder, 
    private spservice:CustomerService,public activeModal: NgbActiveModal) { }
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean;

  ngOnInit() {
    
    this.typeValidationForm = this.formBuilder.group({
      name: ['basic', [Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      phone: ['', [Validators.required,Validators.pattern('[0-9]+')]],
      active_status: ['1', [Validators.required]],
    });

    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'All Customers', active: true }];
    this.spservice.getAllSP().subscribe(resp => {
      console.log(resp);
      this.sps = resp.data
    })

    this.typesubmit = false;
  }

  submit()
  {
    this.typesubmit = true;
    let data = {
      name: this.type.name.value,
      email: this.type.email.value,
      phone: this.type.phone.value,
      active_status: this.type.active_status.value
    }
    this.spservice.postUpdateCustomer(this.id, data).subscribe( resp => {
      console.log("resp", resp)
      this.activeModal.close(this.id);
    }, err=>{ 
      console.log("err", err)
    });
  }
  
  closeModal(id)
  {
    this.activeModal.close(id);
  }

  get type() {
    return this.typeValidationForm.controls;
  }
}
