import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AppGlobals {
    constructor(public router: Router) {
    }
    readonly currentUser: string = (localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')) : this.router.navigate(['/login']) ;
    
}