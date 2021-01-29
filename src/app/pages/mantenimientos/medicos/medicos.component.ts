import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ImagenPipe } from 'src/app/pipes/imagen.pipe';

import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ],
  providers: [ImagenPipe]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = []
  public medicosTemp: Medico[] = []
  public cargando: boolean = true

  // TODO: busqueda pendiente

  // TODO: 
  // Subscription to imageModal observable, to look out when ther's changes on server Images
  private subImage: Subscription

  constructor(private _medicoService: MedicoService,
    private _imagenPipe: ImagenPipe, private _modalImagenService: ModalImagenService,
    private _busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos()

    this.subImage = this._modalImagenService.emitNuevaImagen.pipe(
      delay(1000)
    ).subscribe((img) => {
      this.cargarMedicos()
    })
  }

  ngOnDestroy(): void {
    this.subImage.unsubscribe()
  }

  buscar(termino: string) {
    termino = termino.trim()
    if (termino.length === 0) {
      return this.medicos = this.medicosTemp
    }
    this._busquedasService.buscar("medicos", termino).subscribe((resp) => {
      // console.log(resp);
      this.medicos = resp
    })
  }

  cargarMedicos() {
    this.cargando = true
    this._medicoService.cargarMedicos().subscribe((resp) => {
      console.log(resp);
      this.medicos = resp
      this.medicosTemp = this.medicos
      this.cargando = false
    })
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: `¿Borrar médico?`,
      text: `¿Estas a punto de borrar al médico: ${medico.nombre}?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this._medicoService.borrarMedico(medico._id).subscribe((resp) => {
          this.cargarMedicos()
          Swal.fire(
            "Médico borrado",
            `El médico ${medico.nombre} fue borrado correctamente`,
            "success")
        })
      }
    })
  }

  abrirModal(currentHospital: Medico) {
    const imagenURL = this._imagenPipe.transform(currentHospital.imagen, "medicos")

    this._modalImagenService.abrirModal(
      'medicos', currentHospital._id, currentHospital.imagen, imagenURL
    )
  }

}
