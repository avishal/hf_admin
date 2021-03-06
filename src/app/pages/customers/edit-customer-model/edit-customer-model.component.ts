import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  // @Output() passEntry: EventEmitter<any> = new EventEmitter();
  loading = false;
  error = false;
  errorMessage = ""
  customerData:any = {};

  ngOnInit() {
    
    this.typeValidationForm = this.formBuilder.group({
      name: ['basic', [Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      phone: ['', [Validators.required,Validators.pattern('[0-9]+')]],
      active_status: ['1', [Validators.required]],
    });

    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'All Customers', active: true }];
    
    this.typesubmit = false;

    this.getCustomer();
  }

  getCustomer()
  {
    this.loading = true;
    this.error = false;
    this.errorMessage = "";
    this.spservice.getCustomer(this.id).subscribe( resp => {

      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.customerData = resp.data;
      this.type.name.setValue(this.customerData.name)
      this.type.email.setValue(this.customerData.email)
      this.type.phone.setValue(this.customerData.phone)
      this.type.active_status.setValue(this.customerData.active_status)
      
    }, err=>{ 
      this.loading = false;
      this.error = true;
      this.errorMessage = "Something went wrong. Unable to get customer";
      console.log("err", err)
    });

  }

  submit()
  {
    this.typesubmit = true;
    
    
    if(this.typeValidationForm.invalid)
    {
      return false;
    }
    
    this.loading = true;
    this.error = false;
    this.errorMessage = "";

    let data = {
      name: this.type.name.value,
      email: this.type.email.value,
      phone: this.type.phone.value,
      active_status: this.type.active_status.value
    }
    
    this.spservice.postUpdateCustomer(this.id, data).subscribe( resp => {
      
      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.activeModal.close(this.id);
    }, err=>{ 
      this.loading = false;
      this.error = true;
      this.errorMessage = "Something went wrong.";
      console.log("err", err)
    });
  }
  
  closeModal(id)
  {
    // this.passEntry.emit(this.id);
    this.activeModal.close(id);
  }

  get type() {
    return this.typeValidationForm.controls;
  }
}
