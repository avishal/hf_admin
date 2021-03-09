import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSamplevideosComponent } from './list-samplevideos.component';

describe('BasicComponent', () => {
  let component: ListSamplevideosComponent;
  let fixture: ComponentFixture<ListSamplevideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSamplevideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSamplevideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
