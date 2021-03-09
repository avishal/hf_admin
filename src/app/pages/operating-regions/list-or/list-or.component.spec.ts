import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrComponent } from './list-or.component';

describe('BasicComponent', () => {
  let component: ListOrComponent;
  let fixture: ComponentFixture<ListOrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
