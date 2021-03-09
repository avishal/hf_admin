import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { UIModule } from '../../shared/ui/ui.module';
import { FormRoutingModule } from './form-routing.module';
import { OperatingRegionsService } from './operating-regions.service';
import { CreateNewComponent } from './create-new/create-new.component';
import { ListOrComponent } from './list-or/list-or.component';
import { EditOrModelComponent } from './edit-or-model/edit-or-model.component';
import { EditTrainerModelComponent } from './edit-trainer-model/edit-trainer-model.component';
import { EditLvModelComponent } from './edit-lv-model/edit-lv-model.component';
import { EditSvModelComponent } from './edit-sv-model/edit-sv-model.component';
import { PromoVideoComponent } from './promo-video/promo-video.component';
import { ListLivevideosComponent } from './list-livevideos/list-livevideos.component';
import { ListSamplevideosComponent } from './list-samplevideos/list-samplevideos.component';
import { ListTrainersComponent } from './list-trainers/list-trainers.component';
import { CreateTrainerComponent } from './create-trainer/create-trainer.component';
import { CreateLivevideoComponent } from './create-livevideo/create-livevideo.component';
import { CreateSamplevideoComponent } from './create-samplevideo/create-samplevideo.component';


@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ListOrComponent, CreateNewComponent, EditOrModelComponent, PromoVideoComponent, ListLivevideosComponent, ListTrainersComponent,CreateTrainerComponent, CreateLivevideoComponent, EditTrainerModelComponent, EditLvModelComponent,ListSamplevideosComponent, CreateSamplevideoComponent, EditSvModelComponent],
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
    NgbAlertModule
  ],
  providers: [OperatingRegionsService, DecimalPipe]
})
export class OperatingRegionsModule { }
