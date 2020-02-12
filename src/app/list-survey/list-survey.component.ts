import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import {ExcelService} from '../services/excel.services';

@Component({
  selector: 'app-list-survey',
  templateUrl: './list-survey.component.html',
  styleUrls: ['./list-survey.component.css']
})
export class ListSurveyComponent implements OnInit {

  SurveyListHeader = [];
  SurveyList = [];
  feedbackWholeData = [];
  trainingList = [];

  constructor(private httpService: HttpService, private excelService: ExcelService) {}


  ngOnInit() {
    this.httpService.getSurveyFeedbackList().subscribe(response => {
      console.log(response);
      this.SurveyList = response as [];
      for(var i=0; i < this.SurveyList.length; i++){
          // console.log(this.SurveyList[i].emp_designation.designation);
        this.SurveyListHeader[i]={
          "Survey": this.SurveyList[i].surveydetails.survey_n.survey_name,
          "Location": this.SurveyList[i].surveydetails.survey_location.location_name,
          "Date": this.SurveyList[i].surveydetails.survey_date.t_date,
          "Gender": this.SurveyList[i].surveydetails.emp_gender.gender,
          "Employee Age": this.SurveyList[i].surveydetails.emp_age.age,
          "Years of working in this Company": this.SurveyList[i].surveydetails.emp_years_company.years_company,
          "Department" : this.SurveyList[i].surveydetails.emp_department.department,
          "Sub Department1" : this.SurveyList[i].surveydetails.emp_department.sub_department,
          "Sub Department2" : this.SurveyList[i].surveydetails.emp_department.sub_department_services,
          "Designation" : this.SurveyList[i].surveydetails.emp_designation.designation,
          "In my opinion I, as an employee, am well informed about matters affecting me": this.SurveyList[i].surveydetails.trust.q1,
          "I think I have sufficient authority to do my job well": this.SurveyList[i].surveydetails.trust.q2,
          "I think the people I work with are willing to help each other, even if it means doing something outside their usual activities": this.SurveyList[i].surveydetails.trust.q3,
          "I think my direct supervisor treats me with respect": this.SurveyList[i].surveydetails.trust.q4,
          "In my opinion Continental brings leading technology to the markets": this.SurveyList[i].surveydetails.passion.q5,
          "I think Continentals' internal processes are geared towards providing the best possible solution to our external customers": this.SurveyList[i].surveydetails.passion.q6,
          "I think employees and leaders respect the Code of Conduct of Continental": this.SurveyList[i].surveydetails.passion.q7,
          "In my opinion I have sufficient opportunities to improve my skills through trainings at Continental": this.SurveyList[i].surveydetails.passion.q8,
          "I think I have the opportunity for personal development and growth within Continental": this.SurveyList[i].surveydetails.passion.q9,
          "I am satisfied with my involvement in decisions that affect my work": this.SurveyList[i].surveydetails.freedom.q10,
          "I understand how my work contributes to Continental's business objectives": this.SurveyList[i].surveydetails.freedom.q11,
          "In my opinion we have a culture where one can challenge our traditional ways of doing things": this.SurveyList[i].surveydetails.freedom.q12,
          "I think my direct supervisor encourages people to learn from mistakes": this.SurveyList[i].surveydetails.freedom.q13,       
          "We celebrate our successes at Continental": this.SurveyList[i].surveydetails.foroneanother.q14,
          "I think leaders at Continental support diversity (e.g. diverse perspectives, gender, different cultures etc.) in the workplace (by recognizing and respecting the value of human differences.)": this.SurveyList[i].surveydetails.foroneanother.q15,
          "I think there is good cooperation between my department and other departments": this.SurveyList[i].surveydetails.foroneanother.q16,
          "I am encouraged to share best practices with colleagues": this.SurveyList[i].surveydetails.foroneanother.q17,
          "I think leaders at Continental offer equal opportunities for all employees": this.SurveyList[i].surveydetails.foroneanother.q18,
          "In my direct working environment we take the time to learn from our success": this.SurveyList[i].surveydetails.foroneanother.q19,
          "I think leaders will take results of this survey seriously": this.SurveyList[i].surveydetails.leadership.q20,
          "I think I have a clear understanding of the goals of my department": this.SurveyList[i].surveydetails.leadership.q21,
          "In my opinion the leadership style at Continental encourages employees to give their best": this.SurveyList[i].surveydetails.leadership.q22,
          "In my opinion we live our values (For One Another, Passion to Win, Freedom to Act, Trust) at Continental": this.SurveyList[i].surveydetails.leadership.q23,
          "I think we are doing a good job of retaining people at Continental": this.SurveyList[i].surveydetails.leadership.q24,
          "In my opinion Continental pays me fairly for the work I do (fixed pay, bonus/incentive, benefits)": this.SurveyList[i].surveydetails.performance.q25,
          "In my opinion my relevant work goals and objectives are clearly defined": this.SurveyList[i].surveydetails.performance.q26,
          "I think my job performance is evaluated fairly": this.SurveyList[i].surveydetails.performance.q27,
          "In my opinion my direct supervisor discusses my performance and progress with me on a regular basis": this.SurveyList[i].surveydetails.performance.q28,
          "In my opinion my direct supervisor provides me with feedback that helps me improve my performance": this.SurveyList[i].surveydetails.performance.q29,
          "In my opinion Continental recognizes and rewards good performance not just with money": this.SurveyList[i].surveydetails.performance.q30,
          "In my opinion I am able to balance my work-life and my private-life (e.g. via a flexible work schedule) at Continental": this.SurveyList[i].surveydetails.w_conditions.q31,
          "I think at Continental the health and safety of its employees is cared for": this.SurveyList[i].surveydetails.w_conditions.q32,
          "I think the stress levels at work are usually manageable": this.SurveyList[i].surveydetails.w_conditions.q33,
          "I think at Continental priority is given to safety even if there was a conflict between safety and other business objectives": this.SurveyList[i].surveydetails.w_conditions.q34,
          "I think my direct supervisor takes appropriate action when unsafe conditions are brought to his attention": this.SurveyList[i].surveydetails.w_conditions.q35,
          "I think leaders in Continental are interested in the well-being of employees": this.SurveyList[i].surveydetails.w_conditions.q36,
          "I have enough energy to deliver my work well": this.SurveyList[i].surveydetails.s_engagement.q37,
          "I am proud to work for Continental": this.SurveyList[i].surveydetails.s_engagement.q38,
          "I feel motivated to go “above and beyond” my job responsibilities to get the job done": this.SurveyList[i].surveydetails.s_engagement.q39,
          "I fully support the values (Freedom to Act, Passion to Win, For One Another, Trust) for which Continental stands": this.SurveyList[i].surveydetails.s_engagement.q40,
          "I have the equipment/tools/resources that I need to do my job effectively": this.SurveyList[i].surveydetails.s_engagement.q41,
          "My work gives me a sense of personal accomplishment": this.SurveyList[i].surveydetails.s_engagement.q42,
          "In my opinion the people I work with usually get along well together": this.SurveyList[i].surveydetails.s_engagement.q43,
          "In my opinion there are no substantial obstacles that keep me from doing my job well": this.SurveyList[i].surveydetails.s_engagement.q44,
          "In my opinion at Continental an excellent job is done in standardizing processes to ensure consistent quality": this.SurveyList[i].surveydetails.strategy_quality.q45,
          "I have confidence in the decisions made by the top management team of Continental": this.SurveyList[i].surveydetails.strategy_quality.q46,
          "I think Continental's commitment to quality is apparent in what we do on a daily basis": this.SurveyList[i].surveydetails.strategy_quality.q47,
          "In my opinion the quality of work done in my department is excellent": this.SurveyList[i].surveydetails.strategy_quality.q48,
          "I think I have a good understanding of Continental's strategy": this.SurveyList[i].surveydetails.strategy_quality.q49,
          "Our vision creates excitement and motivation for our organization": this.SurveyList[i].surveydetails.strategy_quality.q50
         };
      }
      
      console.log(this.SurveyListHeader)
    });


  }


  keys() : Array<string> {
    return Object.keys(this.SurveyList);
  }

   transpose(data) {
    let result = {};
    for (let row of data) {
      for (let [key, value] of Object.entries(row)) {
        result[key] = result[key] || [];
        result[key].push(value); 
      }
    }
    return result;
  }
  
  

  exportAsXLSX():void {

    this.excelService.exportAsExcelFile(this.SurveyListHeader, 'survey');
  }

}
