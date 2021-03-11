import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { MustMatch } from './manual-pay-instruction.mustmatch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manual-pay-instruction',
  templateUrl: './manual-pay-instruction.component.html',
  styleUrls: ['./manual-pay-instruction.component.scss']
})

/**
 * Forms manual-pay-instruction component
 */
export class ManualPayInstructionComponent implements OnInit {

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
      description: [''],
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
    this.spservice.getManualPayInst().subscribe(resp => {
      this.type.description.setValue(resp.data.value);
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
      description: this.type.description.value,

    }
    
    if(this.typeValidationForm.invalid)
    {
      return;
    }

      this.spservice.postManualPayInst(data).subscribe( resp => {
        console.log("resp", resp)
        this.router.navigate(['customers']);
      }, err=>{
        console.log("err", err)
      });
    }
}
