import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css'
  ]
})
export class ProgressComponent implements OnInit {

  progress1: number= 50
  progress2: number= 50
  
  constructor() {

  }
  
  ngOnInit(): void {
    
  }

  check(){
    console.log("check1 >>", this.progress1)
    console.log("check2 >>", this.progress2)
  }

  getProgress1(){
    return `${this.progress1}%`
  }

  getProgress2(){
    return `${this.progress2}%`
  }

}
