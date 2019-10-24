import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-createtraining',
  templateUrl: './createtraining.component.html',
  styleUrls: ['./createtraining.component.css']
})
export class CreatetrainingComponent implements OnInit {

  trainingList = [];
  trainerList = [];
  trainingGroupList=[];

  form = this.fb.group({
    training_group: this.fb.group({
      training_group: ['', Validators.required],
    }),
    training: this.fb.group({
      training_name: ['', Validators.required],
    }),
    trainers: this.fb.group({
      trainer_name: ['', Validators.required],
    }),
    location: this.fb.group({
      location_name: ['', Validators.required],
    }),
    sel_from_date: this.fb.group({
      from_date: ['', Validators.required],
    }),
    sel_to_date: this.fb.group({
      to_date: ['', Validators.required],
    }),
  });

  constructor(private fb: FormBuilder, private httpService: HttpService,
    private router: Router) { }

  ngOnInit() {
    this.httpService.getTrainingNameList().subscribe(response => {
      console.log(response);
      this.trainingList = response as [];
    });
    this.httpService.getTrainerNameList().subscribe(response => {
      console.log(response);
      this.trainerList = response as [];
    });

    this.httpService.getTrainingGroupList().subscribe(response => {
      console.log(response);
      this.trainingGroupList = response as [];
    });

  }

  onSubmit() {
    console.log(this.form.value);
    this.convertResponseToPost();
  }

  convertResponseToPost() {
    const finalResponse = {
      'group': this.form.controls['training_group'].value.training_name,
      'training': this.form.controls['training'].value.training_name,
      'trainers': this.form.controls['trainers'].value.trainer_name,
      'location': this.form.controls['location'].value.location_name,
      'from_date': this.form.controls['sel_from_date'].value.from_date,
      'to_date': this.form.controls['sel_to_date'].value.to_date,
    };

    this.makeApiCall(finalResponse);
  }

  makeApiCall(trainingDetails) {
    this.httpService.createTraining(trainingDetails).subscribe(a => {
      if (a.status === 200) {

      } else {
        alert('Some Error Occurred. Please Try Again!');
      }
    });

    this.router.navigate(['traininglist']);
  }
}
