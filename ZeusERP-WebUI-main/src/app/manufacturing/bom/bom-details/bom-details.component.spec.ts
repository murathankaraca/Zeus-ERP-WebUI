import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomDetailsComponent } from './bom-details.component';

describe('BomDetailsComponent', () => {
  let component: BomDetailsComponent;
  let fixture: ComponentFixture<BomDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BomDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
