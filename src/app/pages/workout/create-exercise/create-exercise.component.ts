import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { MustMatch } from './create-exercise.mustmatch';
import { TypeMatch } from './create-exercise.typematch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})

/**
 * Forms Validation component
 */
export class CreateExerciseComponent implements OnInit {

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

    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  
    /**
     * Type validation form
     */
    this.typeValidationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      sub_title: [''],
      description: ['',[Validators.required]],
      level: ['',[Validators.required]],
      focus_area: ['', [Validators.required]],
      type: ['', [Validators.required]],
      duration: ['', [Validators.pattern('[0-9]+'), TypeMatch]],
      repeatition: ['', [, Validators.pattern('[0-9]+'), TypeMatch]],
      active_status: ['1', [Validators.required]],
      image: [''],
      video: ['', Validators.pattern(reg)],
      calories: [''],
    },{
      validator: [TypeMatch('type','duration')],
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
