import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSamplevideoComponent } from './create-samplevideo.component';

describe('CreateSamplevideoComponent', () => {
  let component: CreateSamplevideoComponent;
  let fixture: ComponentFixture<CreateSamplevideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSamplevideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSamplevideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
