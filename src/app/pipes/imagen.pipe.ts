import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {
    if (!imagen) {
      return `${base_url}/upload/nowhere/no-image`
    }

    if (imagen.includes('https')) {
      return imagen
    }

    if (imagen) {
      return `${base_url}/upload/${tipo}/${imagen}`
    } else {
      return `${base_url}/upload/nowhere/no-image`
    }
    return null;
  }

}
