import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit {
  // Chart Doughnut
  @Input() public titleChart: 'NO TITLE'
  // @Input() public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('labelsChart') public doughnutChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input('dataChart') public doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [
    { backgroundColor: ['#97d63e', '#e7ed40', '#edb340', '#d9635f', '#5fbbd9', '#c85de3', '#db3d9a', '#5e5e5e'] }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  // Chart Doughnut
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
