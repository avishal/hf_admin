import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import {OperatingRegionsService} from '../operating-regions.service';
@Component({
  selector: 'app-edit-or-model',
  templateUrl: './edit-or-model.component.html',
  styleUrls: ['./edit-or-model.component.scss']
})

/**
 * Basic table component
 */
export class EditOrModelComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  sps = {};
  id;
  constructor(public formBuilder: FormBuilder, 
    private spservice:OperatingRegionsService,public activeModal: NgbActiveModal) { }
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean;
  // @Output() passEntry: EventEmitter<any> = new EventEmitter();
  loading = false;
  error = false;
  errorMessage = ""
  customerData:any = {};
  states;
  cities;

  ngOnInit() {
    
    this.typeValidationForm = this.formBuilder.group({
      state_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6),Validators.pattern('[0-9]+')]],
      active_status: ['1', [Validators.required]],
    });

    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'All Customers', active: true }];
    
    this.typesubmit = false;
    this.getdata();
    this.getCustomer();
  }

  getdata() {
    this.spservice.getAllStates().subscribe( resp => {
      this.states = resp.data;
    });
  }
  
  getCities()
  {
    this.spservice.getCitiesByState(this.type.state_id.value).subscribe( resp => {
      this.cities = resp.message;
    });
  }

  getCustomer()
  {
    this.loading = true;
    this.error = false;
    this.errorMessage = "";
    this.spservice.getOR(this.id).subscribe( resp => {

      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.customerData = resp.data;
      this.type.state_id.setValue(this.customerData.state_id)
      this.type.city_id.setValue(this.customerData.city_id)
      this.type.pincode.setValue(this.customerData.pincode)
      this.type.active_status.setValue(this.customerData.active_status)
      this.getCities();
    }, err=>{ 
      this.loading = false;
      this.error = true;
      this.errorMessage = "Something went wrong. Unable to get region";
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
      state_id: this.type.state_id.value,
      city_id: this.type.city_id.value,
      pincode: this.type.pincode.value,
      active_status: this.type.active_status.value
    }
    
    this.spservice.postUpdateOR(this.id, data).subscribe( resp => {
      
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
