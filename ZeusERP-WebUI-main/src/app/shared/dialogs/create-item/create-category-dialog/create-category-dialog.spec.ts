import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateCategoryDialog } from './create-category-dialog';

describe('CreateCategoryDialog', () => {
  let component: CreateCategoryDialog;
  let fixture: ComponentFixture<CreateCategoryDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategoryDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
