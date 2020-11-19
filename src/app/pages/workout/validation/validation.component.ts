import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { MustMatch } from './validation.mustmatch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    public spservice:CustomerService) { }
  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  // Form submition
  typesubmit: boolean;

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Validation', active: true }];


    /**
     * Type validation form
     */
    this.typeValidationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['',[Validators.required]],
      level: ['',[Validators.required]],
      focus_area: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      active_status: ['1', [Validators.required]],
      image: ['', Validators.required],
      calories: [''],
    });


    this.typesubmit = false;

  }

  /**
   * Returns the type validation form
   */
  get type() {
    return this.typeValidationForm.controls;
  }

  fileToUpload
  imagePath
  imgURL
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }

  }

  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.typesubmit = true;
    

    if(this.typeValidationForm.invalid)
    {
      return;
    }

    let data = {
      title: this.type.title.value,
      description: this.type.description.value,
      level: this.type.level.value,
      focus_area: this.type.focus_area.value,
      duration: this.type.duration.value,
      calories: this.type.calories.value,
      active_status: this.type.active_status.value,
    }

    this.spservice.postWorkout(this.fileToUpload, data).subscribe( resp => {
      console.log("resp", resp)
    }, err=>{ 
      console.log("err", err)
    });
  }
    
}
