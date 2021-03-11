import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { MustMatch } from './general-diet-exercise.mustmatch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-general-diet-exercise',
  templateUrl: './general-diet-exercise.component.html',
  styleUrls: ['./general-diet-exercise.component.scss']
})

/**
 * Forms general-diet-exercise component
 */
export class GeneralDietExerciseComponent implements OnInit {

  typeValidationForm: FormGroup; // type validation form

  constructor(public formBuilder: FormBuilder,
    public spservice:CustomerService, private router:Router, private _Activatedroute:ActivatedRoute) { }
  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  // Form submition
  typesubmit: boolean;
  user_id;
  alltrainers;
  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Diet Exercise' }, { label: 'Add/Update', active: true }];
    this.user_id = parseInt(this._Activatedroute.snapshot.paramMap.get("id"));
    this.getDietExercise();

    /**
     * Type validation form
     */
    this.typeValidationForm = this.formBuilder.group({
      // title: ['basic', [Validators.required]],
      // subtitle: [''],
      diet_description: ['', [Validators.required]],
      exercise_description: ['', [Validators.required]],
      active_status: ['1', [Validators.required]],
    });


    this.typesubmit = false;
  }


  /**
   * Returns the type validation form
   */
  get type() {
    return this.typeValidationForm.controls;
  }

  getDietExercise()
  {
    this.spservice.getGeneralDietExercise().subscribe( resp => {
      if(resp.success)
      {
        this.type.diet_description.setValue(resp.data.diet_schedule);
        this.type.exercise_description.setValue(resp.data.exercise_schedule);
      }
    }, err=>{
      console.log("err", err)
    });
  }

  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.typesubmit = true;
    let data = {

      // title: this.type.title.value,
      // subtitle: this.type.subtitle.value,
      diet: this.type.diet_description.value,
      exercise: this.type.exercise_description.value,

    }
    
    if(this.typeValidationForm.invalid)
    {
      return;
    }

      this.spservice.postGeneralDietExercise(data).subscribe( resp => {
        this.router.navigate(['customers']);
      }, err=>{
        console.log("err", err)
      });
    }
}
