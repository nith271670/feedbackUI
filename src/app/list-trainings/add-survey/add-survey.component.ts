import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/http.service';
import { FilterPipe } from '../../shared/filter.pipe';
import { AppGlobals } from '../../shared/global';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css'],
  providers: [AppGlobals]
})
export class AddSurveyComponent implements OnInit {

  form = this.fb.group({
    id: [this.data.id],
    survey: this.fb.group({
      survey_name: [this.data.survey, Validators.required],
    }),
    location: this.fb.group({
      location_name: [this.data.location, Validators.required],
    }),
    sel_from_date: this.fb.group({
      from_date: [this.data.from_date, Validators.required],
    }),
    sel_to_date: this.fb.group({
      to_date: [this.data.to_date, Validators.required],
    })
  });

  constructor(private fb: FormBuilder, private httpService: HttpService, private ngxLoader: NgxUiLoaderService, private _global: AppGlobals,
    private router: Router, public dialogRef: MatDialogRef<AddSurveyComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
  }

  onSubmit() {
    //debugger;
    console.log(this.form.controls['survey'].value.survey_name);
    const finalResponse = {
      'id': this.data.id,
      'survey': this.form.controls['survey'].value.survey_name,
      'location':'EB India', //this.form.controls['location'].value.location_name,
      'from_date': this.form.controls['sel_from_date'].value.from_date,
      'to_date': this.form.controls['sel_to_date'].value.to_date
    };

    if (!this.data.id) {
      this.httpService.createSurvey(finalResponse)
        .subscribe(a => {
        }, error => {
          if (error.status === 200) {
            this.dialogRef.close();
            this.dialogRef.afterClosed().subscribe(result => {
              window.location.reload();
            });
          }
        });

    } else {
      this.httpService.updateSurvey(finalResponse)
        .subscribe(a => {
        }, error => {
          if (error.status === 200) {
            this.dialogRef.close();
            this.dialogRef.afterClosed().subscribe(result => {
              window.location.reload();
            });
          }
        });
    }

  }

}
