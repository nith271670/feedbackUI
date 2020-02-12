import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material";
import { OrderPipe } from 'ngx-order-pipe';
import { AddTrainingComponent } from '../list-trainings/add-training/add-training.component';
import { AddSurveyComponent } from '../list-trainings/add-survey/add-survey.component';
import { HttpService } from '../shared/http.service';
import { AppGlobals } from '../shared/global';
import { FilterPipe } from '../shared/filter.pipe';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-list-trainings',
  templateUrl: './list-trainings.component.html',
  styleUrls: ['./list-trainings.component.css'],
  providers: [AppGlobals]
})


export class ListTrainingsComponent implements OnInit {
  isPopupOpened = true;
  TrainingList = [];
  SurveyList = [];
  trainingName = '';
  surveyName = '';
  trainingId = 0;
  surveyId = 0;
  currentUserRole:any;
  currentUser:any;
  confirmStatus = false;
  confirmSurveyStatus = false;
  order = 'createdAt';

  constructor(private httpService: HttpService, private ngxLoader: NgxUiLoaderService, private dialog: MatDialog, private orderPipe: OrderPipe,private _global: AppGlobals) { }
  dialogRef: MatDialogRef<AddTrainingComponent>;
  dialogRef2: MatDialogRef<AddSurveyComponent>;
  ngOnInit() {
    // if(localStorage.getItem('currentUser') != 'admin'){
    //   location.href = '/login';
    // }
    //consolconsole.log(this._global.currentUser);
    if(Object.values(this._global.currentUser).includes('admin')){
      this.currentUserRole = this._global.currentUser["role"];
      this.currentUser = this._global.currentUser["username"];
    }
    else{ 
      this.currentUserRole = '';
      this.currentUser = "";
    }
    this.ngxLoader.start();
    this.httpService.getTrainingList().subscribe(response => {
      console.log(response);
      this.TrainingList = response as [];
      this.ngxLoader.stop();
    });

    this.httpService.getSurveyList().subscribe(response => {
      console.log(response);
      this.SurveyList = response as [];
      this.ngxLoader.stop();
    });


  }
  addTraining() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(AddTrainingComponent, {
      data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  addSurvey() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(AddSurveyComponent, {
      data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  editTraining(id: number) {
    this.isPopupOpened = true;
    this.ngxLoader.start();
    this.httpService.editTraining(id).subscribe(training => {
    console.log(training);
    
      const dialogRef = this.dialog.open(AddTrainingComponent, {
        data: training
        
      });
      this.ngxLoader.stop();
      dialogRef.afterClosed().subscribe(result => {
        this.isPopupOpened = false;
        //this.ngxLoader.stop();
      });
    });
  }


  editSurvey(id: number) {
    this.isPopupOpened = true;
    this.ngxLoader.start();
    this.httpService.editSurvey(id).subscribe(survey => {
    console.log(survey);
    
      const dialogRef = this.dialog.open(AddSurveyComponent, {
        data: survey
        
      });
      this.ngxLoader.stop();
      dialogRef.afterClosed().subscribe(result => {
        this.isPopupOpened = false;
        //this.ngxLoader.stop();
      });
    });
  }

   showConfirmPopUp(id, trainingName) {
    this.confirmStatus = true;
    this.trainingId = id;
    this.trainingName = trainingName;
  }

  showConfirmSurveyPopUp(id, surveyName) {
    this.confirmSurveyStatus = true;
    this.surveyId = id;
    this.surveyName = surveyName;
  }


  cancelDelete() {
    this.confirmStatus = false;
  }

  deleteTraining() {
    this.confirmStatus = false;
    this.ngxLoader.start();
    this.httpService.deleteTraining(this.trainingId)
      .subscribe(a => {
      }, error => {
        if (error.status === 200) {
          this.httpService.getTrainingList().subscribe(response => {
            //console.log(response);
            this.TrainingList = response as [];
            this.ngxLoader.stop();
          });
        }
      });
  }

  cancelDeleteSurvey() {
    this.confirmSurveyStatus = false;
  }

  deleteSurvey() {
    this.confirmSurveyStatus = false;
    this.ngxLoader.start();
    this.httpService.deleteSurvey(this.surveyId)
      .subscribe(a => {
      }, error => {
        if (error.status === 200) {
          this.httpService.getSurveyList().subscribe(response => {
            //console.log(response);
            this.SurveyList = response as [];
            this.ngxLoader.stop();
          });
        }
      });
  }

}
