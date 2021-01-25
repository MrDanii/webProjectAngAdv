import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0
  public usuarios: Array<Usuario> = []
  public usuariosTemp: Array<Usuario> = []
  public desde: number = 0
  public cargando: boolean = true

  public subImage: Subscription // subImage

  constructor(private _usuarioService: UsuarioService,
    private _busquedasService: BusquedasService,
    private _modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.subImage.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarUsuarios()

    this.subImage = this._modalImagenService.emitNuevaImagen.pipe(
      delay(100)
    ).subscribe((img) => {
      this.cargarUsuarios()
    })
  }

  cargarUsuarios() {
    this.cargando = true
    this._usuarioService.cargarUsuarios(this.desde).subscribe(({ ok, total, usuarios }) => {
      this.totalUsuarios = total
      this.usuarios = usuarios
      this.usuariosTemp = usuarios
      this.cargando = false
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor

    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor
    }

    this.cargarUsuarios()
  }

  buscar(termino: string) {
    termino = termino.trim()
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp
    }
    this._busquedasService.buscar("usuarios", termino).subscribe((resp) => {
      console.log(resp);
      this.usuarios = resp
    })
  }

  editarUsuario(currentUser: Usuario) {
    console.log(currentUser);
  }

  eliminarUsuario(currentUser: Usuario) {
    if (currentUser.uid === this._usuarioService.uid) {
      return Swal.fire("Error", "No puedes borrarte a ti mismo", "error")
    }
    Swal.fire({
      title: `¿Borrar usuario?`,
      text: `¿Estas a punto de borrar a: ${currentUser.nombre}?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.eliminarUsuario(currentUser).subscribe((resp) => {
          this.cargarUsuarios()
          Swal.fire(
            "Usuario borrado",
            `El usuario ${currentUser.nombre} fue borrado exitosamente`,
            "success")
        })
      }
    })
  }

  cambiarRol(currentUser: Usuario) {
    console.log(currentUser);
    this._usuarioService.guardarUsuario(currentUser).subscribe((resp) => {
      console.log(resp);
    }, (err) => {
      Swal.fire("Error", "No se pudo cambiar el rol del usuario", "error")
    })
  }

  abrirModal(currentUser: Usuario) {
    this._modalImagenService.abrirModal(
      'usuarios', currentUser.uid, currentUser.imagen, currentUser.getImageURL
    )
  }

}
