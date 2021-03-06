import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/http.service';
import { FilterPipe } from '../../shared/filter.pipe';
import { AppGlobals } from '../../shared/global';
import { NgxUiLoaderService } from 'ngx-ui-loader';



@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css'],
  providers: [AppGlobals]
})
export class AddTrainingComponent {

  trainingList = [];
  trainerList = [];
  TrainingList = [];
  trainingPopUp = false;
  trainerPopUp = false;
  trainingGroupList=[];
  trainingListByGroupId = '';
  selectedProduct ="";

  training = this.fb.group({
    newTraining: this.fb.group({
      new_training: [this.data.newTraining]
    })
  });

  trainerForm = this.fb.group({
    newTrainer: this.fb.group({
      new_trainer: [this.data.newTrainer],
    })
  });
  
  form = this.fb.group({
    id: [this.data.id],
    training_group: this.fb.group({
      training_group: [this.data.group, Validators.required],
    }),
    training: this.fb.group({
      training_name: [this.data.training, Validators.required],
    }),
    trainers: this.fb.group({
      trainer_name: [this.data.trainers, Validators.required],
    }),
    location: this.fb.group({
      location_name: [this.data.location, Validators.required],
    }),
    sel_from_date: this.fb.group({
      from_date: [this.data.from_date, Validators.required],
    }),
    sel_to_date: this.fb.group({
      to_date: [this.data.to_date, Validators.required],
    }),
    training_hours:this.fb.group({
      training_hours_input:[this.data.training_hours],
    }),
    createdBy:this.fb.group({
      createdBy:[this._global.currentUser],
    }),
    ebGuideForm1:this.fb.group({
      ebGuideForm_check:[this.data.enableEbGuideForm],
    })
  });

  constructor(private fb: FormBuilder, private httpService: HttpService, private ngxLoader: NgxUiLoaderService, private _global: AppGlobals,
    private router: Router, public dialogRef: MatDialogRef<AddTrainingComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {

    

    this.trainingListByGroupId = this.form.controls['training_group'].value.training_group;
    //this.form.controls['training'].value.training_name.training = this.form.controls['training'].value.training_name;
    this.httpService.getTrainingNameList().subscribe(response => {
      console.log(response);
      this.trainingList = response as [];
    });
    this.httpService.getTrainerNameList().subscribe(response => {
      console.log(response);
      this.trainerList = response as [];
    });
    this.httpService.getTrainingGroupList().subscribe(response => {
      //console.log(response);
      this.trainingGroupList = response as [];
    });
  }
  getGroupId(groupId){
    console.log(groupId);
    this.trainingListByGroupId = groupId;

    console.log(Object.values(this.trainerList).includes(groupId))
    for (let element of this.trainingGroupList) {
      if(element.groupId == groupId){
          this.selectedProduct = element.group_name;
      }
  }
  
    return this.trainingListByGroupId;
    
  }

  onSubmit() {
    //debugger;
    console.log(this.form.controls['training'].value.training_name);
    const finalResponse = {
      'id': this.data.id,
      'group': this.form.controls['training_group'].value.training_group,
      'training': this.form.controls['training'].value.training_name,
      'trainers': this.form.controls['trainers'].value.trainer_name,
      'location': this.form.controls['location'].value.location_name,
      'from_date': this.form.controls['sel_from_date'].value.from_date,
      'to_date': this.form.controls['sel_to_date'].value.to_date,
      'training_hours' :this.form.controls['training_hours'].value.training_hours_input,
      'createdBy' :this.form.controls['createdBy'].value.createdBy.username,
      'enableEbGuideForm': this.form.controls['ebGuideForm1'].value.ebGuideForm_check,
    };
console.log(finalResponse);
    if(finalResponse.training_hours == null){
      finalResponse.training_hours = 0;
    }

    if(finalResponse.enableEbGuideForm == null){
      finalResponse.enableEbGuideForm = false;
    }
    
    if (!this.data.id) {
      this.httpService.createTraining(finalResponse)
        .subscribe(a => {
        }, error => {
          if (error.status === 200) {
            this.dialogRef.close();
            this.dialogRef.afterClosed().subscribe(result => {
              this.httpService.getTrainingList().subscribe(response => {
                console.log(response);
                this.TrainingList = response as [];
                window.location.reload();
              });
            });
          }
        });

    } else {
      this.httpService.updateTraining(finalResponse)
        .subscribe(a => {
        }, error => {
          if (error.status === 200) {
            this.dialogRef.close();
            this.dialogRef.afterClosed().subscribe(result => {
              this.httpService.getTrainingList().subscribe(response => {
                console.log(response);
                this.TrainingList = response as [];
                window.location.reload();
              });
            });
          }
        });
    }

  }

  showTrainingPopUp() {
    this.trainingPopUp = true;
  }

  showTrainerPopUp() {
    this.trainerPopUp = true;
  }


  addTraining() {

    console.log(this.trainingListByGroupId);
    const trainingObj = {
      'training': this.training.controls['newTraining'].value.new_training,
      "groupId": this.trainingListByGroupId
    };

    this.trainingPopUp = false;
    this.httpService.addTrainingName(trainingObj)
      .subscribe(a => {
        console.log(a);
      }, error => {
        if (error.status === 200) {
          this.httpService.getTrainingNameList().subscribe(response => {
            console.log(response);
            this.trainingList = response as [];
          });
        }
      });
  }
  addTrainer() {
    let trainerObj = {
      'trainers': this.trainerForm.controls['newTrainer'].value.new_trainer
    };
    this.trainerPopUp = false;
    this.httpService.addTrainerName(trainerObj)
      .subscribe(a => {
        console.log(a);
      }, error => {
        if (error.status === 200) {
          this.httpService.getTrainerNameList().subscribe(response => {
            console.log(response);
            this.trainerList = response as [];
          });
        }
      });
  }
}