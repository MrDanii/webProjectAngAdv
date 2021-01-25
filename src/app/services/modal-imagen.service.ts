import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _activeModal: boolean = false
  public tipo: 'usuarios' | 'medicos' | 'hospitales'
  public id: string
  public img: string
  public imgUrl: string

  // Emitimos valor para saber cuando actualizar los usuarios
  public emitNuevaImagen: EventEmitter<string> = new EventEmitter<string>()

  get activeModal() {
    return this._activeModal
  }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-img',
    imgUrl: string = ''
  ) {
    this._activeModal = true

    this.tipo = tipo
    this.id = id
    // this.img = img
    this.imgUrl = imgUrl

    // if(img.includes('http')){
    //   this.img = img
    // }else {
    //   this.img = `${base_url}/uploads/${tipo}/${img}`
    // }
    // this.img = img
  }

  cerrarModal() {
    this._activeModal = false
  }

  constructor() { }
}
