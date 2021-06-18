import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomHeatmapComponent } from './custom-heatmap.component';

describe('CustomHeatmapComponent', () => {
  let component: CustomHeatmapComponent;
  let fixture: ComponentFixture<CustomHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
