import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  intervalObs$: Observable<any>
  intervalSuscriptor: Subscription

  obs$: Observable<number> // Observable
  suscriptor1: any // Suscriptor
  suscriptor2: any // Suscriptor

  constructor() {
    this.intervalObs$ = this.createIntervalObservable()
    // this.intervalObs$.subscribe(
    //   next => { console.log(next) },
    //   error => { console.log(error) },
    //   () => { console.log("Interval Observer completed >> ") }
    // )

    // this.intervalObs$.subscribe(nextValue => console.log(nextValue)) 
    // // NOTA: los argumentos que reciba el subscribe son enviados a todos los argumentos
    // // que reciba la funcion "console.log" en el mismo orden
    this.intervalSuscriptor = this.intervalObs$.subscribe(console.log)

    // this.obs$ = this.createObservable()
    // this.suscriptor1 = this.createSuscriptor(this.obs$, 1)
    // this.suscriptor2 = this.createSuscriptor(2)
  }

  ngOnDestroy(): void {
    this.intervalSuscriptor.unsubscribe()
  }

  createIntervalObservable() {
    return interval(500)
      .pipe(
        take(10), // si los datos son filtrados despues del take(), entonces tomara 10 valores pero solo devolvera los que coincidan con el filtro
        map(value => { return value + 1 }),
        filter(value => (value % 2 === 0 ? true : false)),
        // first(value => (value % 2 === 0 ? true : false)),
        // take(10) // si los datos son filtrados antes del take(), entonces tomara 10 valores filtrados
      )
  }

  createObservable(): Observable<number> {
    let i = -1
    // Los intervalos empiezan a trabajar hasta que tenga por lo menos 1 suscriptor
    return new Observable<number>(observer => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i)

        if (i == 2) {
          observer.error(i)
        }

        if (i == 4) {
          clearInterval(intervalo)
          observer.complete()
        }
      }, 1000)
    })
  }

  createSuscriptor(observable$: Observable<number>, idSuscriptor: number) {
    return observable$.pipe(retry(2)).subscribe(
      nextValue => { console.log("suscriptor " + idSuscriptor + " next >> ", nextValue) },
      errorValue => { console.log("suscriptor " + idSuscriptor + " error >> ", errorValue); },
      () => { console.log("suscriptor " + idSuscriptor + " completed >> ") }
    )
  }

  ngOnInit(): void {
  }

}
