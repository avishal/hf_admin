import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrainersComponent } from './list-trainers.component';

describe('BasicComponent', () => {
  let component: ListTrainersComponent;
  let fixture: ComponentFixture<ListTrainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTrainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
