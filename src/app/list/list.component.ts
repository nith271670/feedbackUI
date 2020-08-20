import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import {ExcelService} from '../services/excel.services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  feedBackList = [];
  feedBackListTabulated = [];
  feedbackWholeData = [];
  trainingList = [];
  selectedValue = undefined;
  constructor(private httpService: HttpService, private excelService: ExcelService) {}

   updateSelectedValue(event: string): void{
    // this.selectedValue = event;
    // console.log(this.selectedValue);
  }

  ngOnInit() {
    /*if(localStorage.getItem('currentUser') != 'admin'){
      location.href = '/login';
    }*/
    this.httpService.getList().subscribe(response => {
      console.log(response);
      this.feedBackListTabulated = response as [];
      this.feedBackList = response as [];
      for(var i =0;i<418; i++){
        console.log(i+": add")
        if(this.feedBackListTabulated[i].questions[5] != "FOR ONLINE TRAININGS: Which aspects do you consider positive or negative in terms of using the online training format?"){
          var Qobj = {"question":"FOR ONLINE TRAININGS: Which aspects do you consider positive or negative in terms of using the online training format?","answer":"","question_type": ""}
          this.feedBackListTabulated[i].questions.splice(5, 0, Qobj);
        }
        if(this.feedBackListTabulated[i].questions[6] != "How long did you already work with the EB product (month or years), for which tasks do you use the product(s)?"){
          //var Qobj = {"question":"FOR ONLINE TRAININGS: Which aspects do you consider positive or negative in terms of using the online training format?","answer":"","question_type": ""}
          this.feedBackListTabulated[i].questions[6].question = "How long did you already work with the EB product (month or years), for which tasks do you use the product(s)?"
          this.feedBackListTabulated[i].questions[6].answer = this.feedBackListTabulated[i].questions[6].answer + ". " +this.feedBackListTabulated[i].questions[7].answer;
          this.feedBackListTabulated[i].questions.splice(7, 1);
        }
        
        if(this.feedBackListTabulated[i].questions[8] != "If you had the choice booking a similar training in the future, which would be your preference (Online, Classroom, No preference)?"){
          var Qobj = {"question":"If you had the choice booking a similar training in the future, which would be your preference (Online, Classroom, No preference)?","answer":"","question_type": ""}
          this.feedBackListTabulated[i].questions.splice(8, 0, Qobj);
        }

      }
      // this.feedBackListTabulated.pop();
       console.log(this.feedBackListTabulated);
      // console.log(this.feedbackWholeData);
    });

    this.httpService.getList().subscribe(response => {
      console.log(response);
      this.feedBackList = response as [];
    });

 this.httpService.getTrainingNameList().subscribe(response => {
        console.log(response);
        this.trainingList = response as [];
      });

  }

  exportAsXLSX(){
    var Arr = new Array();
    //Object.assign(Arr, this.feedBackListTabulated);
    Arr = JSON.parse(JSON.stringify(this.feedBackListTabulated))
    this.exportXLSX(Arr);
  }


  exportXLSX(Arr):void {
    // this.httpService.getList().subscribe(response => {
    //   // console.log(response);
    //   this.feedBackList = response as [];
    // });


    if(this.selectedValue !== undefined){
      for(var i =0; i<this.feedBackList.length; i++){

        if(this.feedBackList[i].training !== this.selectedValue){
            console.log(this.feedBackList[i].training);

            console.log(this.selectedValue);
          this.feedBackList.splice(i, 1);
        }
      }
      console.log(this.feedBackList);
    }

      var feedbackArr = new Array();

      feedbackArr = Arr;

      for(var i =0; i<feedbackArr.length; i++){
      
        var question_json = {};
        // console.log(i);
        
        
        for(var j = 0;j< feedbackArr[i].questions.length; j++){
          if(feedbackArr[i].questions[j].question_type == "rating"){          
            for(var k = 0;k< feedbackArr[i].questions[j].subquestions.length; k++){
              question_json[feedbackArr[i].questions[j].subquestions[k].sub_ques+"(rating)"] = parseFloat(feedbackArr[i].questions[j].subquestions[k].rating).toFixed(2);
              question_json[feedbackArr[i].questions[j].subquestions[k].sub_ques+"(comment)"] = feedbackArr[i].questions[j].subquestions[k].comments;
              if(j==1){
                if(feedbackArr[i].questions[j].subquestions[k].trainerrating != undefined){
                  question_json[feedbackArr[i].questions[j].subquestions[k].sub_ques+"(rating)"] = "Overall: "+feedbackArr[i].questions[j].subquestions[k].rating+ ", ";
                  for(var q =0; q<feedbackArr[i].questions[j].subquestions[k].trainerrating.length;q++){
                    question_json[feedbackArr[i].questions[j].subquestions[k].sub_ques+"(rating)"] += feedbackArr[i].questions[j].subquestions[k].trainerrating[q].name +": "+ parseFloat(feedbackArr[i].questions[j].subquestions[k].trainerrating[q].rating).toFixed(2) + ", ";
                  }
                }
                
              }
            }         
          }
          else if(feedbackArr[i].questions[j].question_type == "yes or No"){
            question_json[feedbackArr[i].questions[j].question] = feedbackArr[i].questions[j].answer;
            question_json[feedbackArr[i].questions[j].subquestions[0].sub_ques] = feedbackArr[i].questions[j].subquestions[0].comments;
          }
          else{
            question_json[feedbackArr[i].questions[j].question] = feedbackArr[i].questions[j].answer;
          }
        }
       delete feedbackArr[i].questions; 
       delete feedbackArr[i].id; 
       delete feedbackArr[i].createdAt; 
       delete feedbackArr[i].updatedAt; 
      Object.assign(feedbackArr[i], question_json); 
  
      }
  
        console.log(question_json);
  
      console.log(feedbackArr);
      this.excelService.exportAsExcelFile(feedbackArr, 'feedback');
    }

}
