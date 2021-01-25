import { Usuario } from "../models/usuario.model";

export interface CargarUsuarios {
  ok: boolean
  total: number
  usuarios: Array<Usuario>
}