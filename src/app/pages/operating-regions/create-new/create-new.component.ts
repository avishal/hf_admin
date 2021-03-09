import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OperatingRegionsService } from '../operating-regions.service';
import { MustMatch } from './create-new.mustmatch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})

/**
 * Forms Validation component
 */
export class CreateNewComponent implements OnInit {

  validationform: FormGroup; // bootstrap validation form
  tooltipvalidationform: FormGroup; // bootstrap tooltip validation form
  typeValidationForm: FormGroup; // type validation form
  rangeValidationForm: FormGroup; // range validation form

  constructor(public formBuilder: FormBuilder,
    public spservice:OperatingRegionsService) { }
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  typesubmit: boolean;

  states;
  cities;
  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Operating Region' }, { label: 'Create Operating Region', active: true }];

    /**
     * Type validation form
     */
    this.typeValidationForm = this.formBuilder.group({
      state_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6),Validators.pattern('[0-9]+')]],
      active_status: ['1', [Validators.required]],
    });

    this.typesubmit = false;
    this.getdata();
  }

  /**
   * Returns the type validation form
   */
  get type() {
    return this.typeValidationForm.controls;
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

  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.typesubmit = true;
    let data = {
      state_id: this.type.state_id.value,
      city_id: this.type.city_id.value,
      pincode: this.type.pincode.value,
      active_status: this.type.active_status.value,
    }
    this.spservice.postOR(data).subscribe( resp => {
      console.log("resp", resp)
    }, err=>{ 
      console.log("err", err)});
  }
    

}
