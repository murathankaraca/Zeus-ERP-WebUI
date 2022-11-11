import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateProductDialog } from './create-product-dialog';

describe('CreateProductDialog', () => {
  let component: CreateProductDialog;
  let fixture: ComponentFixture<CreateProductDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
