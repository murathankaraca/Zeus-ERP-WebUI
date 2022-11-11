import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomAddComponent } from './bom-add.component';

describe('BomAddComponent', () => {
  let component: BomAddComponent;
  let fixture: ComponentFixture<BomAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BomAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BomAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
