import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
// import * as Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false

  public registerForm = this._fb.group({
    // email regular expression. ""example@gmail.com""
    // (?=.*[^\.]$)([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)$
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern(
      new RegExp('(?=.*[^\.]$)([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)$')
    )]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    password2: ['', [Validators.required, Validators.minLength(4)]],
    terminos: [true, [Validators.requiredTrue]]
  }, {
    validators: [this.validatorPasswordIguales('password', 'password2')]
  })

  constructor(
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmitted = true

    if (this.registerForm.invalid) {
      return
    }

    // then post form
    this._usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        this._router.navigateByUrl("/")
      }, (err) => {
        // console.warn(err.error.msg)
        // console.log(err.error.msg)
        // Swal.fire('Error', err.error.msg, 'error')

        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: err.error.msg,
          allowOutsideClick: false,
          showCloseButton: true
        })
      })
  }

  campoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

  // aceptarTerminos(){
  //   return (!this.registerForm.get('terminos').value) && this.formSubmitted
  // }

  invalidPasswords(): boolean {
    const pass1 = this.registerForm.get('password').value
    const pass2 = this.registerForm.get('password2').value

    return pass1 !== pass2 && this.formSubmitted
  }

  validatorPasswordIguales(pass1: string, pass2: string) {
    // Retornamos una funcion, 
    // el parametro de esa funcion, es una referencia al formulario en el cual esta siendo utilizada
    return (formGroup: FormGroup) => {
      const controlPass1 = formGroup.get(pass1)
      const controlPass2 = formGroup.get(pass2)

      // Para hacer esta validacion, los password deben ser válidos,
      // porque el metodo setError nos quitaria la validacion de minLenght que tenemos
      if ((controlPass1.value === controlPass2.value)) {
        controlPass2.setErrors(null)
      } else {
        controlPass2.setErrors({ noSonIguales: true })
      }
    }
  }

}
