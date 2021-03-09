import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDietExerciseComponent } from './add-edit-diet-exercise.component';

describe('AddEditDietExerciseComponent', () => {
  let component: AddEditDietExerciseComponent;
  let fixture: ComponentFixture<AddEditDietExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDietExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDietExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
