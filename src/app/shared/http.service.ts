import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//const api_url = 'https://feedback-eb-new.herokuapp.com';
const api_url = 'http://localhost:1337';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get(api_url+'/feedback/list');
  }
  getFeedbackReport(reqBody){
    console.log(reqBody);
    let data: Object = {"training":reqBody.selectedTraining,"date":reqBody.selectedDate,"group":reqBody.selectedGroup,fromDate:reqBody.fromDate,toDate:reqBody.toDate}
    return this.http.post(api_url+'/feedback/getFeedbackReport',data);
  }

  sendFeedback(payLoad): Observable<any> {
    console.log(payLoad);
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

 