import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  public myPromise: Promise<any>

  constructor() {}

  ngOnInit() {

    this.getUsuarios().then(data => {
      console.log("ngOnInit >> ", data)
    })

    // this.createPromise()

    // this.myPromise.then((message) => {
    //   console.log('promise.then >> ', message)
    // }).catch((message) => {
    //   console.log('promise.catch >> ', message)
    // })

    // console.log("fin ngOnInit >>")
  }

  // createPromise() {
  //   this.myPromise = new Promise((resolve, reject) => {
  //     if (false) {
  //       // resolve(this.resolveMethod())  // se le puede pasar otra funcion como parametro, o cualquier otro objeto
  //       resolve('resolve sended')
  //     } else {
  //       // reject(this.rejectMethod())
  //       reject('reject sended')
  //     }
  //   })
  // }

  // resolveMethod() {
  //   console.log('Promise working')
  // }

  // rejectMethod() {
  //   console.log('Promise went wrong')
  // }

  getUsuarios(): Promise<Response> {
    return new Promise((resolve, reject) => {
      fetch("https://reqres.in/api/users?page=2")
        .then(resp => resp.json())
        .then(bodyResp => resolve(bodyResp.data))
    })
  }
  // getUsuarios() {
  //   console.log("getUsuarios")

  //   // fetch("https://reqres.in/api/users?page=2").then(resp => {
  //   //   console.log(resp)
  //   //   resp.json().then(jsonResp => {
  //   //     console.log(jsonResp)
  //   //   })
  //   // })

  //   fetch("https://reqres.in/api/users?page=2")
  //   .then(resp => resp.json() )
  //   .then(bodyResp => console.log("bodyResp >> ", bodyResp.data))
  // }

}
