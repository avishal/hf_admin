import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OperatingRegionsService } from '../operating-regions.service';
import { MustMatch } from './promo-video.mustmatch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-promo-video',
  templateUrl: './promo-video.component.html',
  styleUrls: ['./promo-video.component.scss']
})

/**
 * Forms Validation component
 */
export class PromoVideoComponent implements OnInit {

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
  error: boolean;

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Promotional Video' }, { label: 'Add Promo Video Path', active: true }];

    /**
     * Type validation form
     */
    this.typeValidationForm = this.formBuilder.group({
      promovideourl: ['', [Validators.required]],
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
    this.spservice.getPromoVideo().subscribe( resp => {
      this.type.promovideourl.setValue(resp.data.value);
    });
    
  }
  
  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.typesubmit = true;
    let data = {
      url: this.type.promovideourl.value,
      active_status: this.type.active_status.value,
    }
    this.spservice.updatePromoVideo(data).subscribe( resp => {
      console.log("resp", resp)
      this.error = false;
    }, err=>{ 
      console.log("err", err)});
      this.error = true;
  }
    

}
