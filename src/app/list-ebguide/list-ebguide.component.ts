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
   
    if(localStorage.getItem('currentUser') != 'admin'){
      location.href = '/login';
    }
    this.httpService.getEBGuideFeedbackList().subscribe(response => {
      console.log(response);
      this.feedBackListTabulated = response as [];
console.log(this.feedBackListTabulated[0].formValue.questions[0].subQuestions[0])
this.subQuestObj = this.feedBackListTabulated[0].formValue.questions[0].subQuestions[0]
      // this.feedBackListTabulated.pop();
      // console.log(this.feedBackListTabulated);
      // console.log(this.feedbackWholeData);
    });  
 

  }


 



}
