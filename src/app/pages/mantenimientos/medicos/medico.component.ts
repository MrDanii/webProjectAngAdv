import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit, OnDestroy {

  public medicoForm: FormGroup
  public subMedicoFormHospital: Subscription

  public medicoSeleccionado: Medico
  public hospitalSeleccionado: Hospital

  public hospitales: Hospital[] = []
  public subActivatedRoute: Subscription

  constructor(private _fb: FormBuilder, private _hospitalService: HospitalService,
    private _medicoService: MedicoService, private _router: Router,
    private _activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarHospitales()

    this.subActivatedRoute = this._activatedRouter.params.subscribe(({ id }) => {
      this.cargarMedico(id)
    })

    this.medicoForm = this._fb.group({
      nombre: ["", Validators.required],
      hospital: ["", Validators.required],
    })

    this.subMedicoFormHospital = this.medicoForm.get('hospital').valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find((hospital) => hospital._id === hospitalId)
    })
  }

  ngOnDestroy(): void {
    this.subActivatedRoute.unsubscribe()
    this.subMedicoFormHospital.unsubscribe()
  }

  cargarMedico(id: string) {
    if (id === "nuevo") {
      return
    }
    // Cuando editamos
    console.log(id);
    this._medicoService.getMedicoPorID(id).pipe(delay(100)).subscribe((resp) => {
      if (!resp) {
        return this._router.navigateByUrl(`/dashboard/medicos`)
      }
      const { nombre, hospital: { _id } } = resp
      this.medicoSeleccionado = resp
      this.medicoForm.setValue({ nombre, hospital: _id })
      console.log(this.medicoSeleccionado);
    })
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe((resp: Hospital[]) => {
      this.hospitales = resp
    })
  }

  guardarMedico() {

    if (this.medicoForm.invalid) {
      return
    }
    const { nombre } = this.medicoForm.value

    if (this.medicoSeleccionado) {
      // editar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this._medicoService.actualizarMedico(data).subscribe((resp) => {
        console.log(resp);
        Swal.fire('Actualizado', `Médico ${nombre} actualizado correctamente`, 'success')
      })
    } else {
      // crear
      this._medicoService.crearMedico(this.medicoForm.value).subscribe((resp) => {
        console.log(resp);
        Swal.fire('Creado', `Médico ${nombre} creado correctamente`, 'success')
        this._router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
      })
    }
  }

}
