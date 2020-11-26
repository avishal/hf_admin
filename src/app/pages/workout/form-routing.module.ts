import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';
import { ListExerciseComponent } from './list-exercise/list-exercise.component';

import { ListSpComponent } from './list-sp/list-sp.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { AssignExerciseComponent } from './assign-exercise/assign-exercise.component';

const routes: Routes = [
    {
        path: '',
        component: ListSpComponent
    },
    {
        path: 'create-new',
        component: CreateWorkoutComponent
    },
    {
        path: 'exercises',
        component: ListExerciseComponent
    },
    {
        path: 'create-exercise',
        component: CreateExerciseComponent
    },
    {
        path: 'assign-exercise',
        component: AssignExerciseComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule { }
