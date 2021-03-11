import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { MustMatch } from './admin-support.mustmatch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-support',
  templateUrl: './admin-support.component.html',
  styleUrls: ['./admin-support.component.scss']
})

/**
 * Forms admin-support component
 */
export class AdminSupportComponent implements OnInit {

  typeValidationForm: FormGroup; // type validation form

  constructor(public formBuilder: FormBuilder,
    public spservice:CustomerService, private router:Router, private _Activatedroute:ActivatedRoute) { }
  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  // Form submition
  typesubmit: boolean;
  // user_id;
  alltrainers;
  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Admin Message' }, { label: 'Add/Update', active: true }];
    // this.user_id = parseInt(this._Activatedroute.snapshot.paramMap.get("id"));
    this.getAdminMessage();
    /**
     * Type validation form
     */
    this.typeValidationForm = this.formBuilder.group({
      chat: [''],
      email: [''],
    });


    this.typesubmit = false;
  }


  /**
   * Returns the type validation form
   */
  get type() {
    return this.typeValidationForm.controls;
  }

  getAdminMessage()
  {
    this.spservice.getSupport().subscribe(resp => {
      this.type.chat.setValue(resp.data_chat.value);
      this.type.email.setValue(resp.data_email.value);
    })
  }

  
  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.typesubmit = true;
    let data = {

      // title: this.type.title.value,
      // subtitle: this.type.subtitle.value,
      chat: this.type.chat.value,
      email: this.type.email.value,

    }
    
    if(this.typeValidationForm.invalid)
    {
      return;
    }

      this.spservice.postSupport(data).subscribe( resp => {
        console.log("resp", resp)
        this.router.navigate(['customers']);
      }, err=>{
        console.log("err", err)
      });
    }
}
