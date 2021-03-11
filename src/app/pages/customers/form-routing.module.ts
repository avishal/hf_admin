import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditDietExerciseComponent } from './add-edit-diet-exercise/add-edit-diet-exercise.component';
import { AdminMessageComponent } from './admin-message/admin-message.component';
import { AdminSupportComponent } from './admin-support/admin-support.component';
import { GeneralDietExerciseComponent } from './general-diet-exercise/general-diet-exercise.component';

import { ListSpComponent } from './list-sp/list-sp.component';
import { ListUserDocumentComponent } from './list-user-document/list-user-document.component';
import { ManualPayInstructionComponent } from './manual-pay-instruction/manual-pay-instruction.component';
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
    {
        path: 'gen-diet-exercise',
        component: GeneralDietExerciseComponent
    },
    {
        path: 'admin-message',
        component: AdminMessageComponent
    },
    {
        path: 'pay-instruction',
        component: ManualPayInstructionComponent
    },
    {
        path: 'support',
        component: AdminSupportComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule { }
