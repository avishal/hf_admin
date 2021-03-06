import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerModelComponent } from './edit-customer-model.component';

describe('BasicComponent', () => {
  let component: EditCustomerModelComponent;
  let fixture: ComponentFixture<EditCustomerModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustomerModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
