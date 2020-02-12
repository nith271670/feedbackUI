import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
const api_url = 'https://feedback-eb-new.herokuapp.com';
//const api_url = 'http://localhost:1337';

@Injectable({
  providedIn: 'root'
})
export class HttpService {



  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get(api_url+'/feedback/list');
  }


  sendFeedback(payLoad): Observable<any> {
    return this.http
      .post<any>(api_url+'/feedback/create', payLoad,
        { headers: headers, observe: 'response' }).pipe(
          tap(e => {
            // this.routeToList(e);
          })
        );
  }
  saveEbGuideForm(payLoad): Observable<any> {
    return this.http
      .post<any>(api_url+'/feedback/createEbGuideForm', payLoad,
        { headers: headers, observe: 'response' }).pipe(
          tap(e => {
            // this.routeToList(e);
          })
        );
  }
  getEBGuideFeedbackList() {
    return this.http.get(api_url+'/feedback/ebguidelist');
  }

  getSurveyFeedbackList() {
    return this.http.get(api_url+'/surveyfeedback/list');
  }


  sendSurveyFeedback(payLoad): Observable<any> {
    return this.http
      .post<any>(api_url+'/surveyfeedback/create', payLoad,
        { headers: headers, observe: 'response' }).pipe(
          tap(e => {
            // this.routeToList(e);
          })
        );
  }

  createTraining(trainingDetails): Observable<any> {
    return this.http
      .post<any>(api_url+'/trainingdetails/add', trainingDetails,
        { headers: headers, observe: 'response' }).pipe(
          tap(e => {
            // this.routeToList(e);
          })
        );
  }

  editTraining(trainingId) {
    return this.http.get(api_url+'/trainingdetails/edit/' + trainingId);
  }
  deleteTraining(trainingId) {
    return this.http.post(api_url+'/trainingdetails/delete/' + trainingId, 'delete');
  }

  updateTraining(updatedData) {
    console.log(updatedData);
    return this.http.post(api_url+'/trainingdetails/update/' + updatedData.id, updatedData);
  }

  createSurvey(surveyDetails): Observable<any> {
    return this.http
      .post<any>(api_url+'/surveydetails/add', surveyDetails,
        { headers: headers, observe: 'response' }).pipe(
          tap(e => {
            // this.routeToList(e);
          })
        );
  }

  editSurvey(surveyId) {
    return this.http.get(api_url+'/surveydetails/edit/' + surveyId);
  }
  deleteSurvey(surveyId) {
    return this.http.post(api_url+'/surveydetails/delete/' + surveyId, 'delete');
  }

  updateSurvey(updatedData) {
    console.log(updatedData);
    return this.http.post(api_url+'/surveydetails/update/' + updatedData.id, updatedData);
  }

  getSurveyDetails(surveyId) {
    return this.http.get(api_url+'/surveydetails/details/' + surveyId);
  }

  getSurveyList() {
    return this.http.get(api_url+'/surveydetails/list');
  }

  getTrainingNameList() {
    return this.http.get(api_url+'/trainingnames/list');
  }
  getTrainerNameList() {
    return this.http.get(api_url+'/trainernames/list');
  }
  addTrainerName(name) {
    return this.http.post(api_url+'/trainernames/add/', name);
  }
  getTrainingList() {
    return this.http.get(api_url+'/trainingdetails/list');
  }

  addTrainingName(newTrainingDetails) {
    return this.http.post(api_url+'/trainingnames/add/', newTrainingDetails);
  }

  getTrainingDetails(trainingId) {
    return this.http.get(api_url+'/trainingdetails/details/' + trainingId);
  }

  getUserList() {
    return this.http.get(api_url+'/users/list');
  }
  getUser(username) {
    return this.http.get(api_url+'/users/getuser/'+username);
  }
  

  addUser(userDetails): Observable<any> {
    console.log(userDetails)
    return this.http
      .post<any>(api_url+'/users/add', userDetails,
        { headers: headers, observe: 'response' }).pipe(
          tap(e => {
             console.log(userDetails)
          })
        );
  }

  getRoleList() {
    return this.http.get(api_url+'/UsersGroup/list');
  }
  addTrainingGroup(groupDetails) {
    console.log(groupDetails)
    return this.http.post(api_url+'/Traininggroups/add', groupDetails);
  }

  getTrainingGroupList(){
    return this.http.get(api_url+'/Traininggroups/list');
  }
}

 