import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserDocumentComponent } from './list-user-document.component';

describe('BasicComponent', () => {
  let component: ListUserDocumentComponent;
  let fixture: ComponentFixture<ListUserDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
