import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
// const api_url = 'https://feedback-eb-new.herokuapp.com';
const api_url = 'http://localhost:1337';

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
}

