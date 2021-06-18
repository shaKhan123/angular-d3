import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../config/data.service';
import { DataResponse } from '../config/DataResponse';

@Component({
  selector: 'app-custom-heatmap',
  templateUrl: './custom-heatmap.component.html',
  styleUrls: ['./custom-heatmap.component.css']
})
export class CustomHeatmapComponent implements OnInit {

  private colors: any[] = [
    '#5e519f',
    '#3788ba',
    '#6ac1a5',
    '#acdca6',
    '#e6f49d',
    '#fffec2',
    '#fddf90',
    '#f26d4a',
    '#d34052',
    '#9a0942',
    '#ff0000'
  ];


  private xScale;
  private yScale;
  private canvas;
  private tooltip = this.createTooltip();
  private dataResponse: DataResponse | undefined;
  private margin = { top: 20, right: 50, bottom: 30, left: 85 };
  private width = 1100 - this.margin.left - this.margin.right;
  private height = 600 - this.margin.top - this.margin.bottom;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getData().subscribe(
      (data: DataResponse) => {
        this.dataResponse = { ...data }
        console.log(this.dataResponse)
        this.drawCanvas();
        this.generateScales(this.dataResponse);
        this.drawAxes();
        this.drawCells(this.dataResponse);
        this.createLegend(this.dataResponse);
      })
  }

  private drawCanvas() {
    const { left, top, bottom, right } = this.margin;

    this.canvas = d3.select(".heatmapGraph")
      .append("svg")
      .attr("width", this.width + left + right)
      .attr("height", this.height + top + bottom)
      .append("g")
      .attr("transform", "translate(" + left + "," + top + ")");

  }

  private generateScales(dataResponse: DataResponse) {

    const { monthlyVariance } = dataResponse;
    const length = monthlyVariance.length;
    const year0 = monthlyVariance[0].year;

    // set x and y scale
    this.xScale = d3.scaleTime().range([0, this.width])
      .domain([new Date(year0, 0), new Date(monthlyVariance[length - 1].year, 0)]);
    this.yScale = d3.scaleTime().range([0, this.height])
      .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)]);

  }

  private drawAxes() {

    const xAxis = d3.axisBottom(this.xScale);
    const yAxis = d3.axisLeft(this.yScale)
      .tickFormat(<any>d3.timeFormat('%B'));

    this.canvas.append('g')
      .call(xAxis)
      .attr('id', 'x-axis')
      .attr("transform", "translate(0," + this.height + ")");


    this.canvas.append('g')
      .call(yAxis)
      .attr('id', 'y-axis');

  }

  private createColorScale(dataResponse: DataResponse) {
    const { baseTemperature, monthlyVariance } = dataResponse;
    // set color scale
    const min = d3.min(monthlyVariance.map(d => d.variance));
    const max = d3.max(monthlyVariance.map(d => d.variance));
    return d3.scaleQuantile()
      .domain([min! + baseTemperature, max! + baseTemperature])
      .range(this.colors);
  }

  private drawCells(dataResponse: DataResponse) {

    const { baseTemperature, monthlyVariance } = dataResponse;
    const colorScale = this.createColorScale(dataResponse);

    this.canvas.selectAll("rect")
      .data(monthlyVariance)
      .enter()
      .append("rect")
      .style('fill', (data) => colorScale(data.variance + baseTemperature))
      .attr('x', (data) => this.xScale(new Date(data.year, 0, 0, 0, 0, 0, 0)))
      .attr('width', () => {
        let minYear = d3.min(monthlyVariance, (item) => item.year);
        let maxYear = d3.max(monthlyVariance, (item) => item.year);
        let yearCount = maxYear! - minYear!
        return (this.width) / yearCount
      })
      .attr('height', this.height / 12)
      .attr('y', data => this.yScale(new Date(0, data.month - 1, 0, 0, 0, 0, 0)))
      .on("mouseover", this.mouseover)
      .on("mousemove", (event, data) => this.mousemove(event, baseTemperature, data))
      .on("mouseleave", this.mouseleave);

  }

  private mouseover(){
    this.tooltip.style("visibility", "visible");
  }

  private mouseleave(){
    this.tooltip.style("visibility", "hidden");
  }

  private mousemove(event, baseTemp, data){
    console.log(`============= ${data}`)

    this.tooltip.transition()        
    .duration(200)      
    .style("opacity", .9)
  
    this.tooltip.html("<b>"+210+"</b>"+
    "<br>"+ '0798' +" °C"
   )	                .style("left", (event.pageX + 3) + "px")     
   .style("top", (event.pageY - 55) + "px"); ;
  }

  private createTooltip(){
    return d3.select(".heatmapGraph")
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .text("I'm a circle!");
  }

  private createLegend(dataResponse: DataResponse) {

    const legend = [0, 2.8, 4, 5.1, 6.2, 7.3, 8.4, 9.5, 10.6, 11.7, 12.8];
    const x_axis = 720;
    const y_axis = 0;
    const rectWidth = 30;
    const colorScale = this.createColorScale(dataResponse);

    const svgContainer = d3.select(".heatmapGraph").append("svg")
      .attr("width", rectWidth * legend.length + x_axis)
      .attr("height", 200);

    svgContainer.selectAll(".rect")
      .data(legend)
      .enter()
      .append("rect")
      .attr("x", (d, i) => x_axis + (rectWidth * i))
      .attr("y", function (d, i) { return y_axis; })
      .attr("width", rectWidth)
      .attr("height", 20)
      .style("fill", (d) => colorScale(d));

    svgContainer.selectAll('.text')
      .data(legend)
      .enter().append('text')
      .text((d) => d.toString())
      .attr("x", (d, i) => x_axis + (rectWidth * i))
      .attr("y", y_axis + 35);

  }

}
