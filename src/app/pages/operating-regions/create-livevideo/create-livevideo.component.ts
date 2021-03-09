import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OperatingRegionsService } from '../operating-regions.service';
import { MustMatch } from './create-livevideo.mustmatch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-livevideo',
  templateUrl: './create-livevideo.component.html',
  styleUrls: ['./create-livevideo.component.scss']
})

/**
 * Forms Validation component
 */
export class CreateLivevideoComponent implements OnInit {

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

    this.breadCrumbItems = [{ label: 'Live Videos' }, { label: 'Create Live Video', active: true }];

    /**
     * Type validation form
     */
    this.typeValidationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      videoid: ['', [Validators.required]],
      status: ['1', [Validators.required]],
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
      videoid: this.type.videoid.value,
      status: this.type.status.value,
    }
    this.spservice.addLiveVideo(data).subscribe( resp => {
      console.log("resp", resp)
    }, err=>{ 
      console.log("err", err)});
  }
    

}
