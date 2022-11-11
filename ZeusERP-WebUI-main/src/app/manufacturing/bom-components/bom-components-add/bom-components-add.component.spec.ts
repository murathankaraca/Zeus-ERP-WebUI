import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomComponentsAddComponent } from './bom-components-add.component';

describe('BomComponentsAddComponent', () => {
  let component: BomComponentsAddComponent;
  let fixture: ComponentFixture<BomComponentsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BomComponentsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BomComponentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
