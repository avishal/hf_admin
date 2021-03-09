import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLivevideoComponent } from './create-livevideo.component';

describe('CreateLivevideoComponent', () => {
  let component: CreateLivevideoComponent;
  let fixture: ComponentFixture<CreateLivevideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLivevideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLivevideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
