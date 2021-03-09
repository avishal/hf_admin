import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOrComponent } from './list-or/list-or.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { PromoVideoComponent } from './promo-video/promo-video.component';
import { ListTrainersComponent } from './list-trainers/list-trainers.component';
import { ListLivevideosComponent } from './list-livevideos/list-livevideos.component';
import { ListSamplevideosComponent } from './list-samplevideos/list-samplevideos.component';
import { CreateTrainerComponent } from './create-trainer/create-trainer.component';
import { CreateLivevideoComponent } from './create-livevideo/create-livevideo.component';
import { CreateSamplevideoComponent } from './create-samplevideo/create-samplevideo.component';

const routes: Routes = [
    {
        path: '',
        component: ListOrComponent
    },
    {
        path: 'create-new',
        component: CreateNewComponent
    },
    {
        path: 'promo-video',
        component: PromoVideoComponent
    },
    {
        path: 'live-video',
        component: ListLivevideosComponent
    },
    {
        path: 'sample-video',
        component: ListSamplevideosComponent
    },
    {
        path: 'trainers',
        component: ListTrainersComponent
    },
    {
        path: 'create-new-trainer',
        component: CreateTrainerComponent
    },
    {
        path: 'create-new-lv',
        component: CreateLivevideoComponent
    },
    {
        path: 'create-new-sv',
        component: CreateSamplevideoComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule { }
