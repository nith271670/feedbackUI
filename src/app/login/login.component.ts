import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  username='';
  password='';

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('currentUser') == 'admin'){
      location.href = '/home';
    }
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.username);
    if(this.username =="admin" && this.password == "admin"){
      localStorage.setItem('currentUser', this.username);
      location.href = '/home';

    }
  }

}
