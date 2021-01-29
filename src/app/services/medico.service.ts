import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/'

import { environment } from 'src/environments/environment';

import { Medico } from '../models/medico.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private _http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || ''
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMedicos() {
    const url = `${base_url}/medicos`
    return this._http.get(url, this.headers).pipe(
      map((resp: { ok: boolean, medicos: Medico[] }) => {
        // console.log(resp);
        return resp.medicos
      })
    )
  }

  getMedicoPorID(id: string) {
    const url = `${base_url}/medicos/${id}`
    return this._http.get(url, this.headers).pipe(
      map((resp: { ok: boolean, medico: Medico }) => {
        // console.log(resp);
        return resp.medico
      })
    )
  }

  crearMedico(medico: {nombre: string, hospital: string}) {
    const url = `${base_url}/medicos`
    return this._http.post<{ ok: boolean, medico: any }>(url, medico, this.headers)
  }

  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`
    return this._http.put<{ ok: boolean, medico: any }>(url, medico, this.headers)
  }

  borrarMedico(id: string) {
    const url = `${base_url}/medicos/${id}`
    return this._http.delete<{ ok: boolean, msg: string }>(url, this.headers)
  }
}
