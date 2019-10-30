import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppGlobals } from '../shared/global';

@Injectable()
export class DirectAccessGuard implements CanActivate {
  constructor(private router: Router,private _global: AppGlobals) {}

  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // If the previous URL was blank, then the user is directly accessing this page
    if (this.router.url === '/') {
      this.router.navigate(['']); // Navigate away to some other page
      return false;
    }
    if(Object.values(this._global.currentUser).includes('other') && this.router.url==='/list'){
      this.router.navigate(['/list']); // Navigate away to some other page
      return false;
    }
    return true;
  }
}