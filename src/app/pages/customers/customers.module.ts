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
import { ValidationComponent } from './validation/validation.component';
import { ListSpComponent } from './list-sp/list-sp.component';
import { ListUserDocumentComponent } from './list-user-document/list-user-document.component';
import { EditCustomerModelComponent } from './edit-customer-model/edit-customer-model.component';
import { EditCustomerDocumentModelComponent } from './edit-customer-document-model/edit-customer-document-model.component';
import { AddEditDietExerciseComponent } from './add-edit-diet-exercise/add-edit-diet-exercise.component';
import { GeneralDietExerciseComponent } from './general-diet-exercise/general-diet-exercise.component';
import { AdminMessageComponent } from './admin-message/admin-message.component';
import { ManualPayInstructionComponent } from './manual-pay-instruction/manual-pay-instruction.component';
import { AdminSupportComponent } from './admin-support/admin-support.component';
import { CustomerService } from './customer.service';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ListSpComponent ,ValidationComponent,EditCustomerModelComponent,ListUserDocumentComponent, EditCustomerDocumentModelComponent, AddEditDietExerciseComponent, AdminMessageComponent, ManualPayInstructionComponent, AdminSupportComponent,GeneralDietExerciseComponent],
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
export class CustomersModule { }
