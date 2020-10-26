import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { title: 'main', url: '/' },
        { title: 'Grafica Inicial', url: 'grafica1' },
        { title: 'Rxjs', url: 'rxjs' },
        { title: 'Progress Bar', url: 'progress' },
        { title: 'Promesas', url: 'promesas' },
      ]
    }
  ]

  constructor() { }
}
