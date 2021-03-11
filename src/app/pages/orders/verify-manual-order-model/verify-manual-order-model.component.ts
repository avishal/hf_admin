import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import {OrderService} from '../orders.service';
@Component({
  selector: 'app-verify-manual-order-model',
  templateUrl: './verify-manual-order-model.component.html',
  styleUrls: ['./verify-manual-order-model.component.scss']
})

/**
 * Basic table component
 */
export class VerifyManualOrderModelComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  sps = {};
  id;
  constructor(public formBuilder: FormBuilder, 
    private spservice:OrderService,public activeModal: NgbActiveModal) { }
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean;
  // @Output() passEntry: EventEmitter<any> = new EventEmitter();
  loading = false;
  error = false;
  errorMessage = ""
  customerData:any = {};

  ngOnInit() {
    
    this.typeValidationForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      status: ['', [Validators.required]],
      paymentnumber: ['', [Validators.required]],
    });

    this.breadCrumbItems = [{ label: 'Order' }, { label: 'Order', active: true }];
    
    this.typesubmit = false;

    this.getCustomer();
  }

  getCustomer()
  {
    this.loading = true;
    this.error = false;
    this.errorMessage = "";
    this.spservice.getUserSubscription(this.id).subscribe( resp => {

      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.customerData = resp.data;
      this.type.id.setValue(this.customerData.id)
      this.type.status.setValue(this.customerData.is_verified)
      this.type.paymentnumber.setValue(this.customerData.paymentid)
      
    }, err=>{ 
      this.loading = false;
      this.error = true;
      this.errorMessage = "Something went wrong. Unable to get order";
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
      is_verified: this.type.status.value,
      paymentid: this.type.paymentnumber.value
    }
    
    this.spservice.postUpdateOrderVerificationStatus(this.id, data).subscribe( resp => {
      
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
