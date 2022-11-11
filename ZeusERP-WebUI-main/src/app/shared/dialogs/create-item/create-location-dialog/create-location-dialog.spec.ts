import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateLocationDialog } from './create-location-dialog';

describe('CreateLocationDialog', () => {
  let component: CreateLocationDialog;
  let fixture: ComponentFixture<CreateLocationDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLocationDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLocationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
