import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-training-groups',
  templateUrl: './training-groups.component.html',
  styleUrls: ['./training-groups.component.css']
})
export class TrainingGroupsComponent implements OnInit {
  data = {group_name:"",
  groupId:"",
  description:""};

  constructor(private fb: FormBuilder, private httpService: HttpService,
    private router: Router, private ngxLoader: NgxUiLoaderService) { }
    ngOnInit() {
    }
    onSubmit() {
      console.log(this.data);
      var sampledata = JSON.stringify(this.data)
      this.ngxLoader.start();
      this.httpService.addTrainingGroup(sampledata)
              .subscribe(a => {
                this.ngxLoader.stop();
              }, error => {
                console.log(error);
                this.data={
                  group_name:"",
                  groupId:"",
                  description:""
                }
                this.ngxLoader.stop();
              });
            }
      }