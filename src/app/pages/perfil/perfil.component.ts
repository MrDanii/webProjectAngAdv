import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/app/models/usuario.model';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup
  public usuario: Usuario
  public imagenSubir: File
  public imgTemp: any = null

  constructor(private _fb: FormBuilder, private _usuarioService: UsuarioService,
    private _fileUploadService: FileUploadService) {
    this.usuario = _usuarioService.usuario
  }

  ngOnInit(): void {
    this.perfilForm = this._fb.group({
      nombre: [this.usuario.nombre || '', Validators.required],
      email: [this.usuario.email || '', [Validators.required,
      Validators.pattern(
        new RegExp('(?=.*[^\.]$)([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)$')
      )]]
    })
  }

  actualizarPerfil() {
    this._usuarioService.actualizarUsuario(this.perfilForm.value).subscribe(resp => {
      const { nombre, email } = this.perfilForm.value
      this.usuario.nombre = nombre
      this.usuario.email = email

      Swal.fire('Success', "Usuario actualizado correctamente", "success")
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error')
    })
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file

    if (!file) {
      return this.imgTemp = null
    }

    const reader = new FileReader()
    const url64 = reader.readAsDataURL(file)

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }

  }

  subirImagen() {
    this._fileUploadService.actualizarFoto(this.imagenSubir, "usuarios", this.usuario.uid).
      then(img => {
        this.usuario.imagen = img
        Swal.fire('Success', 'Imagen actualizada correctamente', 'success')
      }, err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error')
      })
  }

}
