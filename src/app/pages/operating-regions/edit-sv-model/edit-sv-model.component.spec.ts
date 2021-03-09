import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSvModelComponent } from './edit-sv-model.component';

describe('BasicComponent', () => {
  let component: EditSvModelComponent;
  let fixture: ComponentFixture<EditSvModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSvModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSvModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
