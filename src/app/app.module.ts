import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { DayWeekHeatmapComponent } from './day-week-heatmap/day-week-heatmap.component';

import { HttpClientModule } from '@angular/common/http';
import { CustomHeatmapComponent } from './custom-heatmap/custom-heatmap.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    DayWeekHeatmapComponent,
    CustomHeatmapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
