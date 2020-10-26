import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [
  ]
})
export class BreadcrumsComponent implements OnInit {

  public titulo: string
  public tituloObs$: Observable<any>
  public tituloSub: Subscription

  constructor(private router: Router) {
    this.tituloObs$ = this.getDataRouteObservable()
    this.tituloSub = this.getDataRouteSubscriptor()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.tituloSub.unsubscribe()
  }

  private getDataRouteObservable() { 
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    )
  }

  private getDataRouteSubscriptor() {
    return this.tituloObs$.subscribe(({ titulo }) => {
      this.titulo = titulo
      document.title = `Admin Pro - ${titulo}`
    })
  }

}
