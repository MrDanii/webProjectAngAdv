import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators/'

import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = `${environment.base_url}/todo/coleccion`

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios(resultados: any): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.imagen, user.google, user.rol, user.uid)
    )
    
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string = '') {
    const url = `${base_url}/${tipo}/${termino}`
    return this._http.get(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados)       
          default:
            break;
        }
      })
    )
  }
}
