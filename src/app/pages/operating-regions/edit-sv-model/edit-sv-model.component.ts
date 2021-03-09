import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import {OperatingRegionsService} from '../operating-regions.service';
@Component({
  selector: 'app-edit-sv-model',
  templateUrl: './edit-sv-model.component.html',
  styleUrls: ['./edit-sv-model.component.scss']
})

/**
 * Basic table component
 */
export class EditSvModelComponent implements OnInit {
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
  states;
  cities;

  ngOnInit() {
    
    this.typeValidationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      videoid: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });

    this.breadCrumbItems = [{ label: 'Live Videos' }, { label: 'LV', active: true }];
    
    this.typesubmit = false;
    this.getTrainer();
  }

  getTrainer()
  {
    this.loading = true;
    this.error = false;
    this.errorMessage = "";
    this.spservice.getSampleVideo(this.id).subscribe( resp => {

      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.customerData = resp.data;
      this.type.title.setValue(this.customerData.title)
      this.type.videoid.setValue(this.customerData.videoid)
      this.type.status.setValue(this.customerData.status)
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
      title: this.type.title.value,
      videoid: this.type.videoid.value,
      status: this.type.status.value,
    }
    
    this.spservice.updateSampleVideo(this.id, data).subscribe( resp => {
      
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
  
  closeModal(id)
  {
    // this.passEntry.emit(this.id);
    this.activeModal.close(id);
  }

  get type() {
    return this.typeValidationForm.controls;
  }
}
