import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario

  constructor(private _usuarioService: UsuarioService, private _router: Router) {
    this.usuario = _usuarioService.usuario
  }

  ngOnInit(): void {
  }

  logout() {
    this._usuarioService.logoutGoogleAuth()
  }

  buscar(termino: string){
    if(termino.trim().length === 0){
      return
      // this._router.navigateByUrl(`/dashboard`)
    }
    this._router.navigateByUrl(`/dashboard/busqueda/${termino}`)
  }

}
