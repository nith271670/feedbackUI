import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AppGlobals {
    constructor(public router: Router, public activatedRoute: ActivatedRoute) {
    }
    debugger;
    readonly currentUser: string = (localStorage.getItem('currentUser') || window.location.href.includes('/trainingform') ||  window.location.href.includes('/ebguideform')) ? JSON.parse(localStorage.getItem('currentUser')) : this.router.navigate(['/login']) ;
}