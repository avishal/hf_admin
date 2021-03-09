import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import {CustomerService} from '../customer.service';
@Component({
  selector: 'app-edit-customer-document-model',
  templateUrl: './edit-customer-document-model.component.html',
  styleUrls: ['./edit-customer-document-model.component.scss']
})

/**
 * Basic table component
 */
export class EditCustomerDocumentModelComponent implements OnInit {
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
      remark: [''],
      verified: ['0', [Validators.required]],
      active_status: ['0', [Validators.required]],
    });

    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'All Customers', active: true }];
    
    this.typesubmit = false;

    this.getCustomerDocument();
  }

  getCustomerDocument()
  {
    this.loading = true;
    this.error = false;
    this.errorMessage = "";
    this.spservice.getCustomerDocument(this.id).subscribe( resp => {

      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.customerData = resp.data;
      this.type.remark.setValue(this.customerData.remark)
      this.type.verified.setValue(this.customerData.verified)
      this.type.active_status.setValue(this.customerData.active_status)
      
    }, err=>{ 
      this.loading = false;
      this.error = true;
      this.errorMessage = "Something went wrong. Unable to get customer document";
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
      remark: this.type.remark.value,
      verified: this.type.verified.value,
      active_status: this.type.active_status.value
    }
    
    this.spservice.postUpdateCustomerDocumentStatus(this.id, data).subscribe( resp => {
      
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
