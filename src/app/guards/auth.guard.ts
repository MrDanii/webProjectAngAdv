import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private _usuarioService: UsuarioService,
    private _router: Router) {

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._usuarioService.verificarToken()
    .pipe(
      tap( (isAuth) => {
        if(!isAuth){
          this._router.navigateByUrl('/login')
        }
      })
    )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._usuarioService.verificarToken()
    .pipe(
      tap( (isAuth) => {
        if(!isAuth){
          this._router.navigateByUrl('/login')
        }
      })
    )
  }

}
