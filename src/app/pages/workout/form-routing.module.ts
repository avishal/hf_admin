import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';

import { ListSpComponent } from './list-sp/list-sp.component';
import { ValidationComponent } from './validation/validation.component';

const routes: Routes = [
    {
        path: '',
        component: ListSpComponent
    },
    {
        path: 'create-new',
        component: ValidationComponent
    },
    {
        path: 'create-exercise',
        component: CreateExerciseComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule { }
