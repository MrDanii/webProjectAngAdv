interface _HospitalUser {
  _id: string,
  nombre: string,
  imagen: string
}

export class Hospital {
  constructor(
    public nombre: string,
    public _id?: string,
    public imagen?: string,
    public usuario?: _HospitalUser
  ) { }
}