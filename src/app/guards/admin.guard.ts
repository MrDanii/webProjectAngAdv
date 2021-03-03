import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  usuario

  constructor(private _usuarioService: UsuarioService,
    private _router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this._usuarioService.rol == "ADMIN_ROLE") {
      return true
    } else {
      this._router.navigateByUrl("/")
      return false
    }
  }

}
