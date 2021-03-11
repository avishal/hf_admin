import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyManualOrderModelComponent } from './verify-manual-order-model.component';

describe('BasicComponent', () => {
  let component: VerifyManualOrderModelComponent;
  let fixture: ComponentFixture<VerifyManualOrderModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyManualOrderModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyManualOrderModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
