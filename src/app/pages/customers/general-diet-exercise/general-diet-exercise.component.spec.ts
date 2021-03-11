import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDietExerciseComponent } from './general-diet-exercise.component';

describe('GeneralDietExerciseComponent', () => {
  let component: GeneralDietExerciseComponent;
  let fixture: ComponentFixture<GeneralDietExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralDietExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDietExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
