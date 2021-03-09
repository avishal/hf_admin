import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import {CustomerService} from '../customer.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer-model',
  templateUrl: './edit-customer-model.component.html',
  styleUrls: ['./edit-customer-model.component.scss']
})

/**
 * Basic table component
 */
export class EditCustomerModelComponent implements OnInit {
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

    this.typeValidationForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('[a-zA-Z-_ ]+')]],
      description: ['',[Validators.required]],
      level: ['',[Validators.required]],
      focus_area: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      active_status: ['1', [Validators.required]],
      image: [''],
      calories: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });

    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'All Customers', active: true }];

    this.typesubmit = false;

    this.getWorkout();
  }

  fileToUpload= null;
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

  getWorkout()
  {
    this.loading = true;
    this.error = false;
    this.errorMessage = "";
    this.spservice.getWorkout(this.id).subscribe( resp => {

      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.workoutData = resp.data;
      this.type.title.setValue(this.workoutData.title)
      this.type.description.setValue(this.workoutData.description)
      this.type.level.setValue(this.workoutData.level)
      this.type.focus_area.setValue(this.workoutData.focus_area)
      this.type.duration.setValue(this.workoutData.duration)
      this.type.active_status.setValue(this.workoutData.active_status)
      // this.type.image.setValue(this.workoutData.image)
      this.imgURL = this.workoutData.small_image_url;
      this.type.calories.setValue(this.workoutData.calories)

    }, err=>{
      this.loading = false;
      this.error = true;
      this.errorMessage = "Something went wrong. Unable to get workout";
      console.log("err", err)
    });

  }

  submit(wpeditform)
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
      description: this.type.description.value,
      level: this.type.level.value,
      focus_area: this.type.focus_area.value,
      duration: this.type.duration.value,
      calories: this.type.calories.value,
      active_status: this.type.active_status.value,
    }

    if(this.fileToUpload != null)
    {
    this.spservice.postUpdateWorkout(this.id, this.fileToUpload, data).subscribe( resp => {

      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.typesubmit = false;
      wpeditform.reset();
      this.activeModal.close(this.id);
      this.successmsg();

    }, err=>{
      this.loading = false;
      this.error = true;
      this.errorMessage = "Something went wrong.";
      console.log("err", err)
    });
  }
  else
  {
    this.spservice.postUpdateWorkoutWOImage(this.id, data).subscribe( resp => {

      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.typesubmit = false;
      wpeditform.reset();

      this.activeModal.close(this.id);
      this.successmsg();
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
