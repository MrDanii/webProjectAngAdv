import { Hospital } from "./hospital.model";

interface _MedicoUser {
  _id: string,
  nombre: string,
  imagen: string
}

export class Medico {
  constructor(
    public nombre: string,
    public _id?: string,
    public imagen?: string,
    public hospital?: Hospital,
    public usuario?: _MedicoUser,
  ) { }
}