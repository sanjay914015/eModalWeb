import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTerminalComponent } from './admin-terminal.component';

describe('AdminTerminalComponent', () => {
  let component: AdminTerminalComponent;
  let fixture: ComponentFixture<AdminTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTerminalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
