import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File
  public imgTemp: any = null

  // la propiedad _modalImagenService
  // la hacemos público para pasar la referencia directamente,
  // es decir que lo podemos utilizar directamente en el html
  constructor(public _modalImagenService: ModalImagenService,
    private _fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null
    this._modalImagenService.cerrarModal()
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

    const tipo: 'usuarios' | 'medicos' | 'hospitales' = this._modalImagenService.tipo
    const uid: string = this._modalImagenService.id
    
    this._fileUploadService.actualizarFoto(this.imagenSubir, tipo, uid).
      then(img => {
        Swal.fire('Success', 'Imagen actualizada correctamente', 'success')
        this.cerrarModal()
        this._modalImagenService.emitNuevaImagen.emit(img)
      }, err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error')
      })
  }

}
