import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import {OperatingRegionsService} from '../operating-regions.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-edit-trainer-model',
  templateUrl: './edit-trainer-model.component.html',
  styleUrls: ['./edit-trainer-model.component.scss']
})

/**
 * Basic table component
 */
export class EditTrainerModelComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  sps = {};
  id;
  constructor(public formBuilder: FormBuilder, 
    private spservice:OperatingRegionsService,public activeModal: NgbActiveModal) { }
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean;
  // @Output() passEntry: EventEmitter<any> = new EventEmitter();
  loading = false;
  error = false;
  errorMessage = ""
  customerData:any = {};

  ngOnInit() {
    
    this.typeValidationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: [''],
      description: [''],
      expert: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });

    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'All Customers', active: true }];
    
    this.typesubmit = false;
    this.getTrainer();
  }

  fileToUpload
  imagePath
  imgURL
  public Editor = ClassicEditor;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }

  }

  getTrainer()
  {
    this.loading = true;
    this.error = false;
    this.errorMessage = "";
    this.spservice.getTrainer(this.id).subscribe( resp => {

      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.customerData = resp.data;
      this.type.name.setValue(this.customerData.name)
      // this.type.image.setValue(this.customerData.image)
      this.type.expert.setValue(this.customerData.expert)
      this.type.status.setValue(this.customerData.status)
      this.type.description.setValue(this.customerData.description)
    }, err=>{ 
      this.loading = false;
      this.error = true;
      this.errorMessage = "Something went wrong. Unable to get region";
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
      name: this.type.name.value,
      image: this.type.image.value,
      expert: this.type.expert.value,
      description: this.type.description.value,
      status: this.type.status.value,
    }
    
    if(this.fileToUpload != null)
    {
      this.spservice.updateTrainerWithImage(this.fileToUpload,this.id, data).subscribe( resp => {
        
        this.loading = false;
        this.error = false;
        this.errorMessage = ""

        this.activeModal.close(this.id);
      }, err=>{ 
        this.loading = false;
        this.error = true;
        this.errorMessage = "Something went wrong.";
        console.log("err", err)
      });
    }
    else {
      this.spservice.updateTrainer(this.id, data).subscribe( resp => {
        
        this.loading = false;
        this.error = false;
        this.errorMessage = ""

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
}
