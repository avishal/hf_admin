import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import {SubscriptionService} from '../subscription.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  public Editor = ClassicEditor;
  constructor(public formBuilder: FormBuilder, 
    private spservice:SubscriptionService,public activeModal: NgbActiveModal) { }
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean;
  // @Output() passEntry: EventEmitter<any> = new EventEmitter();
  loading = false;
  error = false;
  errorMessage = ""
  customerData:any = {};

  ngOnInit() {
    
    this.typeValidationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      subtitle: [''],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      discount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      tax: ['0', [Validators.required, Validators.pattern('[0-9]+')]],
      duration: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      active_status: ['', [Validators.required]],
    });

    this.breadCrumbItems = [{ label: 'Subscription Plan' }, { label: 'All Plans', active: true }];
    
    this.typesubmit = false;

    this.getSP();
  }

  getSP()
  {
    this.loading = true;
    this.error = false;
    this.errorMessage = "";
    this.spservice.getSP(this.id).subscribe( resp => {

      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.customerData = resp.data;
      this.type.title.setValue(this.customerData.title)
      this.type.subtitle.setValue(this.customerData.sub_title)
      this.type.description.setValue(this.customerData.description)
      this.type.price.setValue(this.customerData.price)
      this.type.discount.setValue(this.customerData.discount)
      this.type.tax.setValue(this.customerData.tax)
      this.type.duration.setValue(this.customerData.duration)
      this.type.active_status.setValue(this.customerData.active_status)
      
    }, err=>{ 
      this.loading = false;
      this.error = true;
      this.errorMessage = "Something went wrong. Unable to get subscription plan";
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
      title: this.type.title.value,
      subtitle: this.type.subtitle.value,
      description: this.type.description.value,
      price: this.type.price.value,
      discount: this.type.discount.value,
      tax: this.type.tax.value,
      duration: this.type.duration.value,
      active_status: this.type.active_status.value
    }
    
    this.spservice.postUpdateSP(this.id, data).subscribe( resp => {
      
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
