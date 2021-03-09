import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';

import { ListSpComponent } from './list-sp/list-sp.component';
import { ValidationComponent } from './validation/validation.component';

const routes: Routes = [
    {
        path: '',
        component: ListSpComponent
    },
    {
        path: 'validation',
        component: ValidationComponent
    },
    {
        path: 'invoice/:id',
        component: DetailComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule { }
