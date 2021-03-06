import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import {CustomerService} from '../customer.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TypeMatch } from '../create-exercise/create-exercise.typematch';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-exercise-model',
  templateUrl: './edit-exercise-model.component.html',
  styleUrls: ['./edit-exercise-model.component.scss']
})

/**
 * Basic table component
 */
export class EditExerciseModelComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  sps = {};
  public Editor = ClassicEditor;
  id;
  constructor(public formBuilder: FormBuilder, 
    private spservice:CustomerService,public activeModal: NgbActiveModal) { }
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean;
  // @Output() passEntry: EventEmitter<any> = new EventEmitter();
  loading = false;
  error = false;
  errorMessage = ""
  workoutData:any = {};
  ngOnInit() {
    
  const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';


    this.typeValidationForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('[a-zA-Z-_ ]+')]],
      sub_title: [''],
      description: ['',[Validators.required]],
      level: ['',[Validators.required]],
      focus_area: ['', [Validators.required]],
      type: ['', [Validators.required]],
      duration: ['', [Validators.pattern('[0-9]+'), TypeMatch]],
      repetition: ['', [, Validators.pattern('[0-9]+'), TypeMatch]],
      active_status: ['1', [Validators.required]],
      image: [''],
      video: [''/*, Validators.pattern(reg)*/],
      calories: [''],
    },{
      validator: [TypeMatch('type','duration')],
    });

    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'All Customers', active: true }];
    
    this.typesubmit = false;

    this.getExercise();
  }

  fileToUpload
  imagePath
  imgURL
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }

  }

  getExercise()
  {
    this.loading = true;
    this.error = false;
    this.errorMessage = "";
    this.spservice.getExercise(this.id).subscribe( resp => {

      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.workoutData = resp.data;
      this.type.title.setValue(this.workoutData.title)
      this.type.sub_title.setValue(this.workoutData.sub_title)
      this.type.description.setValue(this.workoutData.description)
      this.type.level.setValue(this.workoutData.level)
      this.type.focus_area.setValue(this.workoutData.focus_area)
      this.type.type.setValue(this.workoutData.type)
      this.type.duration.setValue(this.workoutData.duration)
      this.type.repetition.setValue(this.workoutData.repetition)
      this.type.active_status.setValue(this.workoutData.active_status)
      this.type.video.setValue(this.workoutData.video)
      // this.type.image.setValue(this.workoutData.image)
      this.imgURL = this.workoutData.small_image_url;
      this.type.calories.setValue(this.workoutData.calories)
      
    }, err=>{ 
      this.loading = false;
      this.error = true;
      this.errorMessage = "Something went wrong. Unable to get exercise";
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
      title: this.type.title.value,
      sub_title: this.type.sub_title.value,
      description: this.type.description.value,
      level: this.type.level.value,
      focus_area: this.type.focus_area.value,
      video: this.type.video.value,
      type: this.type.type.value,
      duration: this.type.duration.value,
      repetition: this.type.repetition.value,
      calories: this.type.calories.value,
      active_status: this.type.active_status.value,
    }

    if(this.fileToUpload != null)
    {
      this.spservice.postUpdateExercise(this.id, this.fileToUpload, data).subscribe( resp => {
        
        this.loading = false;
        this.error = false;
        this.errorMessage = ""
        this.successmsg();
        this.activeModal.close(this.id);
      }, err=>{ 
        this.loading = false;
        this.error = true;
        this.errorMessage = "Something went wrong.";
        console.log("err", err)
      });
    }
    else 
    {
      this.spservice.postUpdateExerciseWOImage(this.id, data).subscribe( resp => {
        
        this.loading = false;
        this.error = false;
        this.errorMessage = ""
        this.successmsg();
        this.activeModal.close(this.id);
      }, err=>{ 
        this.loading = false;
        this.error = true;
        this.errorMessage = "Something went wrong.";
        console.log("err", err)
      });
    }
  }
  
  closeModal(id)
  {
    // this.passEntry.emit(this.id);
    this.activeModal.close(id);
  }

  get type() {
    return this.typeValidationForm.controls;
  }

  successmsg() {
    Swal.fire('Good job!', 'Saved!', 'success');
  }
}
