import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import {OrderService} from '../orders.service';
@Component({
  selector: 'app-img-model',
  templateUrl: './img-model.component.html',
  styleUrls: ['./img-model.component.scss']
})

/**
 * Basic table component
 */
export class ImgModelComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  sps = {};
  imgpath;
  constructor(public formBuilder: FormBuilder, 
    private spservice:OrderService,public activeModal: NgbActiveModal) { }
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean;
  // @Output() passEntry: EventEmitter<any> = new EventEmitter();
  loading = false;
  error = false;
  errorMessage = ""
  customerData:any = {};

  ngOnInit() {
    
    
  }

  
  closeModal(id)
  {
    // this.passEntry.emit(this.id);
    this.activeModal.close(id);
  }

}
