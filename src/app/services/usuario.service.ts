import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators/'
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url
declare const gapi: any

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any
  public usuario: Usuario

  constructor(private _http: HttpClient, private _router: Router, private _ngZone: NgZone) {
    this.initGoogleAuth()
  }

  get uid(): string {
    return this.usuario.uid || ''
  }

  get rol(): "ADMIN_ROLE" | "USER_ROLE" {
    return this.usuario.rol
  }

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

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem("token", token)
    localStorage.setItem("menu", JSON.stringify(menu))
  }

  initGoogleAuth() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '770549914950-4b724738vkch6oefrlfc1nt39at0rdgl.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(true)
      });
    })
  }

  verificarToken(): Observable<boolean> {

    return this._http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { email, google, imagen, nombre, rol, uid } = resp.usuario
        this.usuario = new Usuario(nombre, email, '', imagen, google, rol, uid)

        this.guardarLocalStorage(resp.token, resp.menu)
        return true
      }),
      catchError((resp) => of(false))
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this._http.post(`${base_url}/usuarios`, formData)
      .pipe(tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu)
      }))
  }

  actualizarUsuario(formData: { nombre: string, email: string, rol: string }) {
    formData = {
      ...formData,
      rol: this.usuario.rol
    }

    return this._http.put(`${base_url}/usuarios/${this.uid}`, formData, this.headers)
  }

  loginUsuario(formData: RegisterForm) {
    return this._http.post(`${base_url}/login`, formData)
      .pipe(tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu)
      }))
  }

  loginGoogle(token) {
    return this._http.post(`${base_url}/login/google`, { token })
      .pipe(tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu)
      }))
  }

  logoutGoogleAuth() {
    localStorage.removeItem("token")
    localStorage.removeItem("menu")

    // TODO: Destruir menu

    this.auth2.signOut().then(() => {
      this._ngZone.run(() => {
        this._router.navigateByUrl("/login")
      })
    });
  }

  cargarUsuarios(desde: number = 0): Observable<CargarUsuarios> {
    const url = `${base_url}/usuarios?desde=${desde}`
    return this._http.get<CargarUsuarios>(url, this.headers).pipe(
      map(resp => {
        const usuarios = resp.usuarios.map(user => new Usuario(
          user.nombre, user.email, '', user.imagen,
          user.google, user.rol, user.uid
        ))
        resp.usuarios = usuarios
        return resp
      })
    )
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`
    return this._http.delete(url, this.headers)
  }

  guardarUsuario(usuario: Usuario) {
    return this._http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers)
  }
}
