import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { MustMatch } from './create-workout.mustmatch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.scss']
})

/**
 * Forms Validation component
 */
export class CreateWorkoutComponent implements OnInit {

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
      title: ['', [Validators.required, Validators.pattern('[a-zA-Z-_ ]+')]],
      description: ['',[Validators.required]],
      level: ['',[Validators.required]],
      focus_area: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      active_status: ['1', [Validators.required]],
      image: [''],
      calories: ['', [Validators.pattern('[0-9]+')]],
    });


    this.typesubmit = false;

  }

  /**
   * Returns the type validation form
   */
  get type() {
    return this.typeValidationForm.controls;
  }

  fileToUpload = null;
  imagePath
  imgURL
  loading = false;
  error = false;
  errorMessage = "";

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
  typeSubmit(wpform) {
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
    this.loading = true;
    if(this.fileToUpload != null)
    {

      this.spservice.postWorkout(this.fileToUpload, data).subscribe( resp => {
        console.log("resp", resp)
        this.typesubmit = false;
        wpform.reset();
        this.successmsg();
        this.loading = false;
        this.error = false;
        this.errorMessage = "";

      }, err=>{ 
        console.log("err", err)
        this.loading = false;
        this.error = true;
        this.errorMessage = "Something went wrong. Unable to save";

        if(err.success == false)
        {
          // if(err.error.title)
          //   this.errorMessage = err.error.title[0];
          // else if(err.error.title)
          // this.errorMessage = err.error.title[0];

        }

      });
    }
    else {
      this.spservice.postWorkoutWOImage(data).subscribe( resp => {
        console.log("resp", resp)
        this.successmsg();
        wpform.reset();
        this.typesubmit = false;
        this.loading = false;
        this.error = false;
        this.errorMessage = "";

      }, err=>{ 
        console.log("err", err)
        this.loading = false;
        this.error = true;
        this.errorMessage = "Something went wrong. Unable to save";
      });
    }
  }

  successmsg() {
    Swal.fire('Good job!', 'Saved!', 'success');
  }
    
}
