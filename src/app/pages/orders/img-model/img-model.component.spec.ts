import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgModelComponent } from './img-model.component';

describe('BasicComponent', () => {
  let component: ImgModelComponent;
  let fixture: ComponentFixture<ImgModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
