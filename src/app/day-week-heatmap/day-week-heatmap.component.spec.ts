import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayWeekHeatmapComponent } from './day-week-heatmap.component';

describe('DayWeekHeatmapComponent', () => {
  let component: DayWeekHeatmapComponent;
  let fixture: ComponentFixture<DayWeekHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayWeekHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayWeekHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
