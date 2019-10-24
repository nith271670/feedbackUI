import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';
import { AppGlobals } from './shared/global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppGlobals]
})
export class AppComponent {
  title = 'feedbackForm';
  otherUser;
  constructor(public router: Router, private _global: AppGlobals) {
  }

  ngOnInit(){
    this.otherUser = Object.values(this._global.currentUser).includes('other');
    if(Object.values(this._global.currentUser).includes('other')){
      this.router.navigate(['/list'])
    }
    //console.log(this._global.currentUser.username);   

  }
  logout(){
    localStorage.removeItem('currentUser')
    this.router.navigate(['/login'])
  }
  
}
