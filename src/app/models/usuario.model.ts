export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public imagen?: string,
    public google?: boolean,
    public rol?: string,
    public uid?: string
  ) {
  }
}