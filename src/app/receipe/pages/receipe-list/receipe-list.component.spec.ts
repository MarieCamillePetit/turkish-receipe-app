import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeListComponent } from './receipe-list.component';

describe('ReceipeListComponent', () => {
  let component: ReceipeListComponent;
  let fixture: ComponentFixture<ReceipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceipeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
