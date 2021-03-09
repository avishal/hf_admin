import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OperatingRegionsService } from '../operating-regions.service';
import { MustMatch } from './create-trainer.mustmatch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-trainer',
  templateUrl: './create-trainer.component.html',
  styleUrls: ['./create-trainer.component.scss']
})

/**
 * Forms Validation component
 */
export class CreateTrainerComponent implements OnInit {

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
  fileToUpload = null;
  imagePath
  imgURL
  public Editor = ClassicEditor;

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Operating Region' }, { label: 'Create Operating Region', active: true }];

    /**
     * Type validation form
     */
    this.typeValidationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: [''],
      expert: ['', [Validators.required]],
      status: ['1', [Validators.required]],
    });

    this.typesubmit = false;
  }

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
    if(this.typeValidationForm.invalid)
    {
      console.log(this.type.image.errors);
      return;
    }

    let data = {
      name: this.type.name.value,
      image: this.type.image.value,
      expert: this.type.expert.value,
      status: this.type.status.value,
      description: this.type.description.value,
    }
    if(this.fileToUpload != null)
    {
      this.spservice.addTrainer(this.fileToUpload, data).subscribe( resp => {
        console.log("resp", resp)
      }, err=>{ 
        console.log("err", err)});
    }
    else {
      alert("Image is required");
    }
  }
    

}
