import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditTextDetailsComponent } from './edit-text-details.component';

describe('EditTextDetailsComponent', () => {
  let component: EditTextDetailsComponent;
  let fixture: ComponentFixture<EditTextDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTextDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTextDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
