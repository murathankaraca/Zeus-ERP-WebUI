import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventoryMenuComponent } from './inventory-menu.component';

describe('MasterPageComponent', () => {
  let component: InventoryMenuComponent;
  let fixture: ComponentFixture<InventoryMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
