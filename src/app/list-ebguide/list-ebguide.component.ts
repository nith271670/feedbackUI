import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import {ExcelService} from '../services/excel.services';

@Component({
  selector: 'app-list-ebguide',
  templateUrl: './list-ebguide.component.html',
  styleUrls: ['./list-ebguide.component.css']
})
export class ListEBGuideComponent implements OnInit {

  feedBackList = [];
  feedBackListTabulated = [];
  feedbackWholeData = [];
  trainingList = [];
  subQuestObj;
  selectedValue = undefined;
  constructor(private httpService: HttpService, private excelService: ExcelService) { }

  updateSelectedValue(event: string): void{
    // this.selectedValue = event;
    // console.log(this.selectedValue);
  }
 
  ngOnInit() {
    this.httpService.getEBGuideFeedbackList().subscribe(response => {
      console.log(response);
      this.feedBackListTabulated = response as [];
      console.log(this.feedBackListTabulated[0].formValue.questions[0].subQuestions[0])
      this.subQuestObj = this.feedBackListTabulated[0].formValue.questions[0].subQuestions[0];
      // this.feedBackListTabulated.pop();
      // console.log(this.feedBackListTabulated);
      // console.log(this.feedbackWholeData);
    });

  }


  exportAsXLSX():void {
    // this.httpService.getList().subscribe(response => {
    //   // console.log(response);
    //   this.feedBackList = response as [];
    // });

    this.feedBackList = this.feedBackListTabulated;

    // if(this.selectedValue !== undefined){
    //   for(var i =0; i<this.feedBackList.length; i++){

    //     if(this.feedBackList[i].formValue.training !== this.selectedValue){
    //         console.log(this.feedBackList[i].training);

    //         console.log(this.selectedValue);
    //       this.feedBackList.splice(i, 1);
    //     }
    //   }
    //   console.log(this.feedBackList);
    // }


    for(var i =0; i<this.feedBackList.length; i++){
      
      var question_json = {};
      console.log(this.feedBackList[i]);
      // this.feedBackList.push( this.feedBackList[i].formValue.name);
      // this.feedBackList.push( this.feedBackList[i].formValue.training);
      // this.feedBackList.push( this.feedBackList[i].formValue.trainers);
      for(var j = 0;j< this.feedBackList[i].formValue.questions.length; j++){
        if(this.feedBackList[i].formValue.questions[j].question_type == "rating"){          
          if(j==0){
            for(var k = 0;k< this.feedBackList[i].formValue.questions[j].subQuestions.length; k++){
              question_json[this.feedBackList[i].formValue.questions[j].subQuestions[k].sub_ques+"(Content)"] = parseFloat(this.feedBackList[i].formValue.questions[j].subQuestions[k].content_rating).toFixed(2);
              question_json[this.feedBackList[i].formValue.questions[j].subQuestions[k].sub_ques+"(Presentation)"] = parseFloat(this.feedBackList[i].formValue.questions[j].subQuestions[k].presentation_rating).toFixed(2);
            }
          }
            if(j == 2){
              for(var k = 0;k< this.feedBackList[i].formValue.questions[j].subQuestions.length; k++){
                question_json["Exercises ("+this.feedBackList[i].formValue.questions[j].subQuestions[k].sub_ques+")"] = parseFloat(this.feedBackList[i].formValue.questions[j].subQuestions[k].presentation_rating).toFixed(2);
              }
            }
            if(j == 3){
              for(var k = 0;k< this.feedBackList[i].formValue.questions[j].subQuestions.length; k++){
                question_json["Training Expectations ("+this.feedBackList[i].formValue.questions[j].subQuestions[k].sub_ques+")"] = parseFloat(this.feedBackList[i].formValue.questions[j].subQuestions[k].presentation_rating).toFixed(2);
              }
            }
            if(j == 4){
              for(var k = 0;k< this.feedBackList[i].formValue.questions[j].subQuestions.length; k++){
                question_json["General Conditions ("+this.feedBackList[i].formValue.questions[j].subQuestions[k].sub_ques+")"] = parseFloat(this.feedBackList[i].formValue.questions[j].subQuestions[k].presentation_rating).toFixed(2);
              }
            }
          }        
        else{
          question_json[this.feedBackList[i].formValue.questions[j].question] = this.feedBackList[i].formValue.questions[j].answer;
        }
      }
    
    // delete this.feedBackList[i].formValue; 
     delete this.feedBackList[i].id; 
     delete this.feedBackList[i].createdAt; 
     delete this.feedBackList[i].updatedAt; 
    Object.assign(this.feedBackList[i], question_json); 

    }

      console.log(question_json);

    console.log(this.feedBackList);
    this.excelService.exportAsExcelFile(this.feedBackList, 'feedback');
  }



}
