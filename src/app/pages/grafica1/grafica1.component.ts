import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  // donut 1
  d1Title: string = 'Sales'
  d1Labels: string[] = ['D1 Label One', 'D1 Label Two', 'D1 Label Three', 'D1 Label four']
  d1Data: [Array<number>] = [
    [500, 1000, 250, 2000]
  ]

  // donut 2
  d2Title: string = 'Sales'
  d2Labels: string[] = ['D2 Label One', 'D2 Label Two']
  d2Data: [Array<number>] = [
    [500, 1000]
  ]

  // donut 3
  d3Title: string = 'Sales'
  d3Labels: string[] = ['D3 Label One', 'D3 Label Two', 'D3 Label Three', 'D3 Label four']
  d3Data: [Array<number>] = [
    [5, 18, 17, 2]
  ]

  // donut 4
  d4Title: string = 'Sales'
  d4Labels: string[] = ['D4 Label One', 'D4 Label Two', 'D4 Label Three', 'D4 Label four', 'D4 Label five', 'D4 Label six', 'D4 Label seven', 'D4 Label eight']
  d4Data: [Array<number>] = [
    [100, 1000, 250, 400, 700, 3000, 550, 820]
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
