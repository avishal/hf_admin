import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditDietExerciseComponent } from './add-edit-diet-exercise/add-edit-diet-exercise.component';

import { ListSpComponent } from './list-sp/list-sp.component';
import { ListUserDocumentComponent } from './list-user-document/list-user-document.component';
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
        path: 'documents/:id',
        component: ListUserDocumentComponent
    },
    {
        path: 'diet-exercise/:id',
        component: AddEditDietExerciseComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule { }
