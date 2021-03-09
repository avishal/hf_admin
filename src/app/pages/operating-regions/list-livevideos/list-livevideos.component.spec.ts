import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLivevideosComponent } from './list-livevideos.component';

describe('BasicComponent', () => {
  let component: ListLivevideosComponent;
  let fixture: ComponentFixture<ListLivevideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLivevideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLivevideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
