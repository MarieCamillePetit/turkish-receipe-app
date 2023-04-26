import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeFormComponent } from './receipe-form.component';

describe('ReceipeFormComponent', () => {
  let component: ReceipeFormComponent;
  let fixture: ComponentFixture<ReceipeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceipeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
