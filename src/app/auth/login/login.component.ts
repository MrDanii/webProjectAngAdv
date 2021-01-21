import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';

declare const gapi: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public auth2: any
  public formSubmitted = false

  public loginForm = this._fb.group({
    email: [localStorage.getItem("remember_email") || '', [Validators.required, Validators.pattern(
      new RegExp('(?=.*[^\.]$)([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)$')
    )]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    remember: [false]
  })

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.renderButton()
  }

  ngAfterViewInit(): void {
  }

  campoValido(campo: string): boolean {
    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

  login() {
    this.formSubmitted = true

    if (this.loginForm.invalid) {
      return
    }

    this._usuarioService.loginUsuario(this.loginForm.value).subscribe((resp) => {
      // console.log(resp)
      if (this.loginForm.get("remember").value) {
        localStorage.setItem("remember_email", this.loginForm.get("email").value)
      } else {
        localStorage.removeItem("remember_email")
      }

      this._router.navigateByUrl("/")
    }, (err) => {
      console.log(err);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: err.error.msg,
        allowOutsideClick: false,
        showCloseButton: true
      })
    })
  }

  // Google Auth
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      // 'onsuccess': this.onSuccess,
      // 'onfailure': this.onFailure
    });

    this.startApp()
  }

  async startApp() {
    await this._usuarioService.initGoogleAuth()
    this.auth2 = this._usuarioService.auth2

    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        var id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token);
        this._usuarioService.loginGoogle(id_token).subscribe((resp) => {

          this._ngZone.run(() => {
            // Navigate to Dashboard
            // console.log(">> attachSignin", resp);
            this._router.navigateByUrl("/")
          })
        }, (err) => {
          console.log(err);
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: err.error.msg,
            allowOutsideClick: false,
            showCloseButton: true
          })
        })
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  // onSuccess(googleUser) {
  //   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   console.log(id_token);
  // }

  // onFailure(error) {
  //   console.log(error);
  // }

  // renderButton() {
  //   gapi.signin2.render('my-signin2', {
  //     'scope': 'profile email',
  //     'width': 240,
  //     'height': 50,
  //     'longtitle': true,
  //     'theme': 'dark',
  //     'onsuccess': this.onSuccess,
  //     'onfailure': this.onFailure
  //   });
  // }
}
