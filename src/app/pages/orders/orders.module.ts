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
import { EditCustomerModelComponent } from './edit-customer-model/edit-customer-model.component';
import { OrderService } from './orders.service';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ListSpComponent ,ValidationComponent,EditCustomerModelComponent, DetailComponent],
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
    DropzoneModule,
    UIModule,
  ],
  providers: [OrderService, DecimalPipe]
})
export class OrdersModule { }
