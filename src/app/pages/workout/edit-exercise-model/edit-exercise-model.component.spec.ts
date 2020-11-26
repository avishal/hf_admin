import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExerciseModelComponent } from './edit-exercise-model.component';

describe('BasicComponent', () => {
  let component: EditExerciseModelComponent;
  let fixture: ComponentFixture<EditExerciseModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExerciseModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExerciseModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
