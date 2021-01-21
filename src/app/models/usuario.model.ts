import { environment } from "src/environments/environment"

const base_url = environment.base_url
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

  get getImageURL(){

    if(this.imagen.includes('https')){
      return this.imagen
    }
    
    if(this.imagen){
      return `${base_url}/upload/usuarios/${this.imagen}`
    }else{
      return `${base_url}/upload/usuarios/no-image`
    }
  }
}