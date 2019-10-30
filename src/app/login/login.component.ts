import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { AppGlobals } from '../shared/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  username='';
  password='';
  user;

  users = [
    {role:'superadmin', username: "superadmin",password:"superadmin"},
    {role:'admin', username: "admin",password:"admin"},
    {role:'others', username: "admin",password:"admin"}
  ];

  constructor(private httpService: HttpService, private _global: AppGlobals) { }


  ngOnInit() {
 // debugger;
    if(this._global.currentUser == 'admin'){
      location.href = '/home';
    }
    /*else if(this._global.currentUser == 'other'){
      location.href = '/graphicalRepresentation';
    }*/
  }

  onSubmit(){
    this.submitted = true;
    this.httpService.getUser(this.username).subscribe(response => {
      console.log(response);
      this.user = response as Object;
      console.log(this.user);
      if(this.user){
                localStorage.setItem('currentUser', JSON.stringify(this.user));
                if(this.user.role == 'admin'){
                 
                  location.href = '/home';  
                }
                else if(this.user.role == 'other'){
                  location.href = '/list'; 
                }
              }
     
    });

    
  }

}
