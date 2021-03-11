import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPayInstructionComponent } from './manual-pay-instruction.component';

describe('ManualPayInstructionComponent', () => {
  let component: ManualPayInstructionComponent;
  let fixture: ComponentFixture<ManualPayInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualPayInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualPayInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
