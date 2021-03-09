import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLvModelComponent } from './edit-lv-model.component';

describe('BasicComponent', () => {
  let component: EditLvModelComponent;
  let fixture: ComponentFixture<EditLvModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLvModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLvModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
