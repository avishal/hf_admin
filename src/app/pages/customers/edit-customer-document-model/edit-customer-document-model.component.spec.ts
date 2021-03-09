import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerDocumentModelComponent } from './edit-customer-document-model.component';

describe('BasicComponent', () => {
  let component: EditCustomerDocumentModelComponent;
  let fixture: ComponentFixture<EditCustomerDocumentModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustomerDocumentModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerDocumentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
