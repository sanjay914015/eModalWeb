import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerBookingComponent } from './container-booking.component';

describe('ContainerBookingComponent', () => {
  let component: ContainerBookingComponent;
  let fixture: ComponentFixture<ContainerBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
