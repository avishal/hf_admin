import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SubscriptionService } from '../subscription.service';
import { MustMatch } from './validation.mustmatch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})

/**
 * Forms Validation component
 */
export class ValidationComponent implements OnInit {

  typeValidationForm: FormGroup; // type validation form

  constructor(public formBuilder: FormBuilder,
    public spservice:SubscriptionService, private router:Router) { }
  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  // Form submition
  typesubmit: boolean;

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Subscriptions' }, { label: 'Create new', active: true }];

    

    /**
     * Type validation form
     */
    this.typeValidationForm = this.formBuilder.group({
      title: ['basic', [Validators.required]],
      subtitle: [''],
      description: ['abc', [Validators.required]],
      price: ['100', [Validators.required, Validators.pattern('[0-9]+')]],
      discount: ['0', [Validators.required, Validators.pattern('[0-9]+')]],
      tax: ['0', [Validators.required, Validators.pattern('[0-9]+')]],
      duration: ['10', [Validators.required, Validators.pattern('[0-9]+')]],
      active_status: ['1', [Validators.required]],
    });


    this.typesubmit = false;
  }


  /**
   * Returns the type validation form
   */
  get type() {
    return this.typeValidationForm.controls;
  }

  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.typesubmit = true;
    let data = {

      title: this.type.title.value,
      subtitle: this.type.subtitle.value,
      description: this.type.description.value,
      price: this.type.price.value,
      discount: this.type.discount.value,
      tax: this.type.tax.value,
      duration: this.type.duration.value,
      active_status: this.type.active_status.value,

    }
    
    if(this.typeValidationForm.invalid)
    {
      return;
    }

    this.spservice.postSP(data).subscribe( resp => {
      console.log("resp", resp)
      this.router.navigate(['subscriptions']);
    }, err=>{ 
      console.log("err", err)});
    }
    finalPrice = 0;
    calculateTax()
    {
      
    }
}
