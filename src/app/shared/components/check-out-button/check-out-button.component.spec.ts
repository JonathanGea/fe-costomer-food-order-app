import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutButtonComponent } from './check-out-button.component';

describe('CheckOutButtonComponent', () => {
  let component: CheckOutButtonComponent;
  let fixture: ComponentFixture<CheckOutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckOutButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
