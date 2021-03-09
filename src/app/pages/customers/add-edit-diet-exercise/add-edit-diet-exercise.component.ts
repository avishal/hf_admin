import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { MustMatch } from './add-edit-diet-exercise.mustmatch';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-diet-exercise',
  templateUrl: './add-edit-diet-exercise.component.html',
  styleUrls: ['./add-edit-diet-exercise.component.scss']
})

/**
 * Forms add-edit-diet-exercise component
 */
export class AddEditDietExerciseComponent implements OnInit {

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
    this.getTrainers();
    this.getDietExercise();

    /**
     * Type validation form
     */
    this.typeValidationForm = this.formBuilder.group({
      // title: ['basic', [Validators.required]],
      // subtitle: [''],
      diet_description: ['', [Validators.required]],
      exercise_description: ['', [Validators.required]],
      fitnessgoal: ['', [Validators.required]],
      training_link: ['', [Validators.required]],
      trainer_id: ['', [Validators.required]],
      // price: ['100', [Validators.required, Validators.pattern('[0-9]+')]],
      // discount: ['0', [Validators.required, Validators.pattern('[0-9]+')]],
      // tax: ['0', [Validators.required, Validators.pattern('[0-9]+')]],
      // duration: ['10', [Validators.required, Validators.pattern('[0-9]+')]],
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
    this.spservice.getDietExercise(this.user_id).subscribe( resp => {
      if(resp.success)
      {
        this.type.diet_description.setValue(resp.data.diet_schedule);
        this.type.exercise_description.setValue(resp.data.exercise_schedule);
        this.type.fitnessgoal.setValue(resp.data.fitness_goal);
        this.type.training_link.setValue(resp.data.training_link);
        this.type.trainer_id.setValue(resp.data.trainer_id);
      }
    }, err=>{
      console.log("err", err)
    });
  }

  getTrainers()
  {
    this.spservice.getTrainers().subscribe(resp => {
      console.log(resp);
      this.alltrainers = resp.data
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
      diet: this.type.diet_description.value,
      exercise: this.type.exercise_description.value,
      fitness_goal: this.type.fitnessgoal.value,
      training_link: this.type.training_link.value,
      trainer_id: this.type.trainer_id.value,
      // price: this.type.price.value,
      // discount: this.type.discount.value,
      // tax: this.type.tax.value,
      // duration: this.type.duration.value,
      // active_status: this.type.active_status.value,

    }
    
    if(this.typeValidationForm.invalid)
    {
      return;
    }

      this.spservice.postDietExercise(this.user_id, data).subscribe( resp => {
        console.log("resp", resp)
        this.router.navigate(['customers']);
      }, err=>{
        console.log("err", err)
      });
    }
    finalPrice = 0;
    calculateTax()
    {
      
    }
}
