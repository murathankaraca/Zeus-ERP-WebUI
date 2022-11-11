import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManucompDialogComponent } from './create-manucomp-dialog.component';

describe('CreateManucompDialogComponent', () => {
  let component: CreateManucompDialogComponent;
  let fixture: ComponentFixture<CreateManucompDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateManucompDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateManucompDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
