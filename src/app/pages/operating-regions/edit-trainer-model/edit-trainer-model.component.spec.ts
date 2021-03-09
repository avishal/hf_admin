import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainerModelComponent } from './edit-trainer-model.component';

describe('BasicComponent', () => {
  let component: EditTrainerModelComponent;
  let fixture: ComponentFixture<EditTrainerModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTrainerModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrainerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
