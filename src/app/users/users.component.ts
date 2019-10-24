import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
data = {username:"",
role:"",
password:""};
selectRole = "";
  constructor(private fb: FormBuilder, private httpService: HttpService,
    private router: Router,private ngxLoader: NgxUiLoaderService) { }

    userList;
  ngOnInit() {
    
    this.httpService.getRoleList ()
        .subscribe(a => {
          console.log(a)
          this.userList = a;
        }, error => {
          console.log(error);
        });
  }
  getRole(role){
    console.log(role);
    this.selectRole = role;
  }
  onSubmit() {
    this.ngxLoader.start();
    var data = {
      username:this.data.username,
      role:this.selectRole,
      password:this.data.password
    }
          var sampledata = JSON.stringify(data)
          this.httpService.addUser(sampledata)
                  .subscribe(a => {
                    this.data.username = '';
                    this.ngxLoader.stop();
                    
                  }, error => {
                    console.log(error);
                    this.data={
                        role:'',
                        username:'',
                        password:''
                      
                    }
                    this.ngxLoader.stop();
                  });
      }
}
 