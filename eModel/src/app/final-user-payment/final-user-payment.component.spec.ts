import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalUserPaymentComponent } from './final-user-payment.component';

describe('FinalUserPaymentComponent', () => {
  let component: FinalUserPaymentComponent;
  let fixture: ComponentFixture<FinalUserPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalUserPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalUserPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
