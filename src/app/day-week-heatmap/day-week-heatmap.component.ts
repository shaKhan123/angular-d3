import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-day-week-heatmap',
  templateUrl: './day-week-heatmap.component.html',
  styleUrls: ['./day-week-heatmap.component.css']
})
export class DayWeekHeatmapComponent implements OnInit {

  private data = [
    {
      "week": 1,
      "day": 1,
      "value": 6
    },
    {
      "week": 1,
      "day": 2,
      "value": 7
    },
    {
      "week": 1,
      "day": 3,
      "value": 7
    },
    {
    "week": 2,
    "day": 1,
    "value": 6
  },
    {
      "week": 2,
      "day": 2,
      "value": 6
    },
    {
      "week": 2,
      "day": 3,
      "value": 9
    }
  ];

  private colors: any[] = [
    '#5e519f',
    '#3788ba'
  ];

  private svg: any;
  private margin = { top: 20, right: 50, bottom: 30, left: 85 };
  private width = 900 - this.margin.left - this.margin.right;
  private height = 500 - this.margin.top - this.margin.bottom;

  constructor() { }


  ngOnInit(): void {
    this.createSvg();
    this.drawMap(this.data);
  }

  private createSvg(): void {
   
    this.svg = d3.select("figure#map")
    .append("svg")
    .attr("width", this.width + this.margin.left +this. margin.right)
    .attr("height", this.height +  this.margin.top + this.margin.bottom)
    .append("g")
    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

  }

  private drawMap(data: any[]): void {

    const colorDomain: [any, any] = d3.extent(data, d => d.value) // get the min and max value from data
    const colorScale = d3.scaleLinear()
      .domain(colorDomain)
      .range(this.colors);

    // Build X scales and axis:
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.day))
      .padding(0.01);

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))

    // Build X scales and axis:
    var y = d3.scaleBand()
      .range([this.height, 0])
      .domain(data.map(d => d.week))
      .padding(0.01);

    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("map")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.day))
    .attr("y", d => y(d.week))
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .attr("fill", d => colorScale(d.value));

  }

}
