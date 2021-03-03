import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = []
  public hospitales: Hospital[] = []
  public medicos: Medico[] = []

  public terminoBusqueda: string = ""

  constructor(private _activatedRouter: ActivatedRoute,
    private _busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this._activatedRouter.params.subscribe(({termino}) => {
      console.log(termino);
      this.terminoBusqueda = termino
      this.buscarGlobal(this.terminoBusqueda)
    })
  }

  buscarGlobal(termino: string){
    this._busquedasService.buscarGlobal(termino).subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp.usuarios
      this.hospitales = resp.hospitales
      this.medicos = resp.medicos
    })
  }

}
