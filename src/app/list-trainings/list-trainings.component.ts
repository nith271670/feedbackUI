import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { AddTrainingComponent } from '../list-trainings/add-training/add-training.component';
import { MatDialog,  MatDialogConfig, MatDialogRef} from "@angular/material";
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-list-trainings',
  templateUrl: './list-trainings.component.html',
  styleUrls: ['./list-trainings.component.css']
})


export class ListTrainingsComponent implements OnInit {
  isPopupOpened = true;
  TrainingList = [];
  trainingname ='';
  trainingId=0;
  confirmStatus = false;
  order: string = 'createdAt';

  constructor(private httpService: HttpService, private dialog: MatDialog, private orderPipe: OrderPipe) { }
  dialogRef: MatDialogRef<AddTrainingComponent>;

  ngOnInit() {
    if(localStorage.getItem('currentUser') != 'admin'){
      location.href = '/login';
    }
    this.httpService.getTrainingList().subscribe(response => {
      console.log(response);
      this.TrainingList = response as [];
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

  editTraining(id: number) {
    this.isPopupOpened = true;
    this.httpService.editTraining(id).subscribe(training => {

      const dialogRef = this.dialog.open(AddTrainingComponent, {
        data: training
      });

      dialogRef.afterClosed().subscribe(result => {
        this.isPopupOpened = false;
      });
    });
  }

  showConfirmPopUp(id, trainingname) {
    this.confirmStatus = true;
    this.trainingId = id;
    this.trainingname = trainingname;
  }

  cancelDelete(){
    this.confirmStatus = false;
  }

  deleteTraining(){
    this.confirmStatus = false;
    this.httpService.deleteTraining(this.trainingId)
      .subscribe(a => {
      }, error => {
          if ( error.status == 200 ) {
              this.httpService.getTrainingList().subscribe(response => {
                console.log(response);
                this.TrainingList = response as [];
            });
          }
      });

  }

}
