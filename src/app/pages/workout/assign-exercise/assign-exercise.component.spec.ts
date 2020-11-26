import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignExerciseComponent } from './assign-exercise.component';

describe('BasicComponent', () => {
  let component: AssignExerciseComponent;
  let fixture: ComponentFixture<AssignExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
