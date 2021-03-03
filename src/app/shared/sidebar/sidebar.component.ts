import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // menuItems: any[]
  public usuario: Usuario

  constructor(public sidebarService: SidebarService,
    private _usuarioService: UsuarioService) {
    // console.log(_sidebarService.menu)
    // this.menuItems = _sidebarService.menu
    this.usuario = _usuarioService.usuario
  }

  ngOnInit(): void {
  }

}
