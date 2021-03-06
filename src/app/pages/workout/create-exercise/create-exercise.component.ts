import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { MustMatch } from './create-exercise.mustmatch';
import { TypeMatch } from './create-exercise.typematch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

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

    // const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  
    /**
     * Type validation form
     */
    this.typeValidationForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('[a-zA-Z-_ ]+')]],
      sub_title: [''],
      description: ['',[Validators.required]],
      level: ['',[Validators.required]],
      focus_area: ['', [Validators.required]],
      type: ['', [Validators.required]],
      duration: ['', [Validators.pattern('[0-9]+'), TypeMatch]],
      repetition: ['', [Validators.pattern('[0-9]+'), TypeMatch]],
      active_status: ['1', [Validators.required]],
      image: [''],
      video: [''], /*Validators.pattern(reg)*/
      calories: ['',[Validators.pattern('[0-9]+')]],
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

  fileToUpload = null
  imagePath
  imgURL
  loading = false
  error = false
  errorMessage=""

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
  typeSubmit(exForm) {
    this.typesubmit = true;
    

    if(this.typeValidationForm.invalid)
    {
      console.log(this.typeValidationForm);
      return;
    }

    let data = {
      title: this.type.title.value,
      sub_title: this.type.sub_title.value,
      description: this.type.description.value,
      level: this.type.level.value,
      focus_area: this.type.focus_area.value,
      type: this.type.type.value,
      duration: "00:00",
      repetition: 0,
      active_status: this.type.active_status.value,
      video: this.type.video.value,
      calories: this.type.calories.value,
    }

    if(this.type.type.value != 1)
      data.duration = this.type.duration.value;
    else 
      data.repetition = this.type.repetition.value;

    if(this.fileToUpload != null)
    {
      this.spservice.postExercise(this.fileToUpload, data).subscribe( resp => {
        console.log("resp", resp);
        this.successmsg();
        exForm.reset();
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
    else {
      this.spservice.postExerciseWOImage(data).subscribe( resp => {
        console.log("resp", resp);
        this.successmsg();
        exForm.reset();
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
