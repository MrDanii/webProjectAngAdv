import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { ImagenPipe } from 'src/app/pipes/imagen.pipe';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ],
  providers: [ImagenPipe]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = []
  public hospitalesTemp: Hospital[] = []
  public cargando: boolean = true

  // Subscription to imageModal observable, to look out when ther's changes on server Images
  private subImage: Subscription

  constructor(private _hospitalService: HospitalService,
    private _modalImagenService: ModalImagenService,
    private _imagenPipe: ImagenPipe,
    private _busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales()

    this.subImage = this._modalImagenService.emitNuevaImagen.pipe(
      delay(100)
    ).subscribe((img) => {
      this.cargarHospitales()
    })
  }

  ngOnDestroy(): void {
    this.subImage
  }

  buscar(termino: string) {
    termino = termino.trim()
    if (termino.length === 0) {
      return this.hospitales = this.hospitalesTemp
    }
    this._busquedasService.buscar("hospitales", termino).subscribe((resp) => {
      // console.log(resp);
      this.hospitales = resp
    })
  }

  cargarHospitales() {
    this.cargando = true
    this._hospitalService.cargarHospitales().subscribe((resp) => {
      this.hospitales = resp
      this.hospitalesTemp = this.hospitales
      this.cargando = false
    })
  }

  editarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe((resp) => {
      Swal.fire("Actualizado", hospital.nombre, "success")
    })
  }

  borrarHospital(hospital: Hospital) {
    this._hospitalService.borrarHospital(hospital._id).subscribe((resp) => {
      this.cargarHospitales()
      Swal.fire("Borrado", hospital.nombre, "success")
    })
  }

  async abrirSweetAlert() {
    const { value, isConfirmed } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre para un nuevo hospital: ',
      input: 'text',
      inputPlaceholder: 'nombre del hospital...',
      showCancelButton: true
    })

    if (value && value.trim().length > 0) {
      this._hospitalService.crearHospital(value).subscribe((resp) => {
        this.hospitales.push(resp.hospital)
        Swal.fire("Hospital creado", resp.hospital.nombre, "success")
      })
    }
  }

  abrirModal(currentHospital: Hospital) {
    const imagenURL = this._imagenPipe.transform(currentHospital.imagen, "hospitales")

    this._modalImagenService.abrirModal(
      'hospitales', currentHospital._id, currentHospital.imagen, imagenURL
    )
  }

}
