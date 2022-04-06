import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerWatchlistComponent } from './container-watchlist.component';

describe('ContainerWatchlistComponent', () => {
  let component: ContainerWatchlistComponent;
  let fixture: ComponentFixture<ContainerWatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerWatchlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
