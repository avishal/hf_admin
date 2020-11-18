import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule { }
