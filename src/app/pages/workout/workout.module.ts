import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { UIModule } from '../../shared/ui/ui.module';
import { FormRoutingModule } from './form-routing.module';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';
import { ListSpComponent } from './list-sp/list-sp.component';
import { ListExerciseComponent } from './list-exercise/list-exercise.component';
import { EditCustomerModelComponent } from './edit-customer-model/edit-customer-model.component';
import { EditExerciseModelComponent } from './edit-exercise-model/edit-exercise-model.component';
import { AssignExerciseComponent } from './assign-exercise/assign-exercise.component';
import { CustomerService } from './customer.service';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ListSpComponent, AssignExerciseComponent, CreateWorkoutComponent,CreateExerciseComponent,EditCustomerModelComponent, ListExerciseComponent,EditExerciseModelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormRoutingModule,
    UIModule,
    CKEditorModule,
    ArchwizardModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    UiSwitchModule,
    ColorPickerModule,
    NgbDatepickerModule,
    DropzoneModule
  ],
  providers: [CustomerService, DecimalPipe]
})
export class WorkoutModule { }
