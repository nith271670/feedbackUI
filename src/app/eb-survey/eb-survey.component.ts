import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormArray
} from '@angular/forms';
import {
  HttpService
} from '../shared/http.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-eb-survey',
  templateUrl: './eb-survey.component.html',
  styleUrls: ['./eb-survey.component.css']
})

export class EbSurveyComponent implements OnInit {

    surveyform = '';
    public href = '';
    SurveyDetails = {};
    surveyName = '';
    surveyLocation = '';
    surveyDate = '';
    submitBtn_disabled = false;
    submitted = false;
    selected_gender = "male";
    selected_age = "21-29";
    selected_years_company = "Less than a year";
    selected_designation = "Executive Assistant";
    selected_department = "PI";
    selected_sub_department = "IFS PJ";
    selected_sub_department_services = "Standard services";
    submittedSurveys = {};
    SurveyAlreadySubmitted = false;
    pageNo = 0;


    form = this.fb.group({
      survey_n: this.fb.group({
        survey_name: [''],
      }),
      survey_location: this.fb.group({
        location_name: [''],
      }),
      survey_date: this.fb.group({
        t_date: [''],
      }),
      emp_gender: this.fb.group({
        gender: ['', Validators.required],
      }),
      emp_age: this.fb.group({
        age: ['', Validators.required],
      }),
      emp_years_company: this.fb.group({
        years_company: ['', Validators.required],
      }),
      emp_designation: this.fb.group({
        designation: ['', Validators.required],
      }),
      emp_department: this.fb.group({
        department: ['', Validators.required],
        sub_department: ['', Validators.required],
        sub_department_services: ['', Validators.required]
      }),
      trust: this.fb.group({
        q1: ['', Validators.required],
        q2: ['', Validators.required],
        q3: ['', Validators.required],
        q4: ['', Validators.required]
      }),
      passion: this.fb.group({
        q5: ['', Validators.required],
        q6: ['', Validators.required],
        q7: ['', Validators.required],
        q8: ['', Validators.required],
        q9: ['', Validators.required]
      }),
      freedom: this.fb.group({
        q10: ['', Validators.required],
        q11: ['', Validators.required],
        q12: ['', Validators.required],
        q13: ['', Validators.required]
      }),
      foroneanother: this.fb.group({
        q14: ['', Validators.required],
        q15: ['', Validators.required],
        q16: ['', Validators.required],
        q17: ['', Validators.required],
        q18: ['', Validators.required],
        q19: ['', Validators.required]
      }),
      leadership: this.fb.group({
        q20: ['', Validators.required],
        q21: ['', Validators.required],
        q22: ['', Validators.required],
        q23: ['', Validators.required],
        q24: ['', Validators.required]
      }),
      performance: this.fb.group({
        q25: ['', Validators.required],
        q26: ['', Validators.required],
        q27: ['', Validators.required],
        q28: ['', Validators.required],
        q29: ['', Validators.required],
        q30: ['', Validators.required]
      }),
      w_conditions: this.fb.group({
        q31: ['', Validators.required],
        q32: ['', Validators.required],
        q33: ['', Validators.required],
        q34: ['', Validators.required],
        q35: ['', Validators.required],
        q36: ['', Validators.required]
      }),
      s_engagement: this.fb.group({
        q37: ['', Validators.required],
        q38: ['', Validators.required],
        q39: ['', Validators.required],
        q40: ['', Validators.required],
        q41: ['', Validators.required],
        q42: ['', Validators.required],
        q43: ['', Validators.required],
        q44: ['', Validators.required]
      }),
      strategy_quality: this.fb.group({
        q45: ['', Validators.required],
        q46: ['', Validators.required],
        q47: ['', Validators.required],
        q48: ['', Validators.required],
        q49: ['', Validators.required],
        q50: ['', Validators.required]
      })
    });
    constructor(private fb: FormBuilder, private httpService: HttpService,
      private router: Router) { }
  
    ngOnInit() {
      // document.getElementById('main_hd').style.display = "none";
      this.href = this.router.url;
      this.surveyform = this.href.split("/").pop();
      console.log(this.surveyform);

      this.submittedSurveys = JSON.parse(localStorage.getItem('submittedSurveys') || '{}');
      if(this.submittedSurveys[this.surveyform] == this.surveyform){
        this.SurveyAlreadySubmitted = true;
      }

      this.httpService.getSurveyDetails(this.surveyform).subscribe(response => {
        console.log(response);
        this.SurveyDetails = response as {};
        this.surveyName = this.SurveyDetails["survey"];
  
        this.surveyLocation = this.SurveyDetails["location"];
        if (this.SurveyDetails["from_date"] == this.SurveyDetails["to_date"]) {
          this.surveyDate = this.SurveyDetails["from_date"];
        }
        else {
          console.log(this.SurveyDetails["from_date"])
          console.log(this.SurveyDetails["to_date"])
          this.surveyDate = this.SurveyDetails["from_date"] + " to " + this.SurveyDetails["to_date"]
        }
        
      });
    }
  
    onSubmit() {
      this.submitted = true;  
      console.log(JSON.stringify(this.form.value));
      if (this.form.valid) {
          this.convertResponseToPost(this.form.value);
          console.log("success");
          this.submitBtn_disabled = true;
      }
    // this.convertResponseToPost(this.form.value);
    }
  
    convertResponseToPost(formValue) {
      formValue.survey_n.survey_name = this.surveyName;
      formValue.survey_location.location_name = this.surveyLocation;
      formValue.survey_date.t_date = this.surveyDate;
      formValue.emp_department.department = this.selected_department;
      formValue.emp_department.sub_department = this.selected_sub_department;
      formValue.emp_department.sub_department_services = this.selected_sub_department_services;

      const finalResponse = {
        "surveydetails":formValue
      };
      console.log(finalResponse);
      this.makeApiCall(finalResponse);
    }
    makeApiCall(payload) {
      this.httpService.sendSurveyFeedback(payload).subscribe(a => {
        console.log(a);
        if (a.status === 200) {
          this.submittedSurveys[this.surveyform] = this.surveyform;
          localStorage.setItem('submittedSurveys', JSON.stringify(this.submittedSurveys));
          this.router.navigate(['success']);
        } else {
          alert("Some Error Occured. Please Try Again!");
        }
      });
    }

    onChange_department($event){
      // if(this.selected_department != "PI"){
      //   this.selected_sub_department = "-";
      //   this.selected_sub_department_services = "-";     
      // }

      if(this.selected_department != "PI"){
        this.selected_sub_department_services = "-";   
        if(this.selected_department == "PJ") {
          this.selected_sub_department = "CDS"
        }
        else{
          this.selected_sub_department = "-"
        }
      }
      else{
        this.selected_sub_department = "IFS PJ"
        this.selected_sub_department_services = "Standard services";   
      }

      console.log('Department Changed');
      console.log(this.selected_department);
      console.log(this.selected_sub_department);
      console.log(this.selected_sub_department_services);
    }

    onChange_sub_department($event){
      if(this.selected_sub_department == 'IAD' || this.selected_sub_department == 'CDS' || this.selected_sub_department == 'VAL' || this.selected_sub_department == 'COS' || this.selected_sub_department == 'ISS' || this.selected_sub_department == 'UEX'){
        this.selected_sub_department_services = "-"; 
      }
      else{
        if(this.selected_sub_department == 'IFS PJ'){
          this.selected_sub_department_services = "Standard services";
        }
        else if(this.selected_sub_department == 'IFS PI (1)'){
          this.selected_sub_department_services = "Tresos Studio";
        }
        else if(this.selected_sub_department == 'IFS PI (2)'){
          this.selected_sub_department_services = "OS";
        }
        else if(this.selected_sub_department == 'PTO'){
          this.selected_sub_department_services = "OTA";
        }
        else{
          this.selected_sub_department_services = "-"; 
        }
      }
      console.log('Sub Department Changed');
      console.log(this.selected_department);
      console.log(this.selected_sub_department);
      console.log(this.selected_sub_department_services);
    }

    onChange_sub_department_services($event){
      this.selected_sub_department_services  = $event;

      console.log('Sub Department SErvices Changed' + $event);
      console.log(this.selected_department);
      console.log(this.selected_sub_department);
      console.log(this.selected_sub_department_services);
    }

    prevPage(){
      this.pageNo = this.pageNo-1;
    }

    nextPage(){
      this.pageNo = this.pageNo+1;
      console.log('Next');
      console.log(this.selected_department);
      console.log(this.selected_sub_department);
      console.log(this.selected_sub_department_services);
    }
  }