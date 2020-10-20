import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // @Input('percentValue') progress: number = 50
  @Input() progress: number = 50
  @Input() btnClass: string = 'btn-primary'
  @Output() outputValue: EventEmitter<number> = new EventEmitter() // Es necesario inicializarlo ya que un objeto por defecto es nulo

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }

  // Los backticks (comilla invertidas) nos permiten la creación de 'template literals' que son otra forma de plasmar variables
  // especificación: ECMAScript 2015 specification
  // getProgreso() {
  //   return `${this.progress}%`
  // }

  // forma alternativa sin backticks (comillas invertidas)
  // getProgreso2() {
  //   return this.progreso + '%'
  // }

  changeProgress(value: number) {

    if (this.progress >= 100 && value > 0) {
      this.outputValue.emit(100)
      return this.progress = 100
    }

    if (this.progress <= 0 && value < 0) {
      this.outputValue.emit(0)
      return this.progress = 0
    }

    this.progress = this.progress + value
    this.outputValue.emit(this.progress)
  }

  onChange(value: number) {
    if (value > 100) {
      value = 100
    } else if (value < 0 || value == undefined || value == null) {
      value = 0
    } else {
      value = value
    }
    console.log('onChange >> ', value)

    this.outputValue.emit(value)
  }

}
