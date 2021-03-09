import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrModelComponent } from './edit-or-model.component';

describe('BasicComponent', () => {
  let component: EditOrModelComponent;
  let fixture: ComponentFixture<EditOrModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
