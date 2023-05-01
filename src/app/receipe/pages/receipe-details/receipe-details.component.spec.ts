import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeDetailsComponent } from './receipe-details.component';

describe('ReceipeDetailsComponent', () => {
  let component: ReceipeDetailsComponent;
  let fixture: ComponentFixture<ReceipeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceipeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
