import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get('https://feedback-eb-new.herokuapp.com/feedback/list');
  }
  sendFeedback(payLoad): Observable<any> {
    return this.http
      .post<any>('https://feedback-eb-new.herokuapp.com/feedback/create', payLoad,
        { headers: headers, observe: 'response' }).pipe(
          tap(e => {
            // this.routeToList(e);
          })
        );
  }
  saveEbGuideForm(payLoad): Observable<any> {
    return this.http
      .post<any>('https://feedback-eb-new.herokuapp.com/feedback/createEbGuideForm', payLoad,
        { headers: headers, observe: 'response' }).pipe(
          tap(e => {
            // this.routeToList(e);
          })
        );
  }
  getEBGuideFeedbackList() {
    return this.http.get('https://feedback-eb-new.herokuapp.com/feedback/ebguidelist');
  }
  createTraining(trainingDetails): Observable<any> {
    return this.http
      .post<any>('https://feedback-eb-new.herokuapp.com/trainingdetails/add', trainingDetails,
        { headers: headers, observe: 'response' }).pipe(
          tap(e => {
            // this.routeToList(e);
          })
        );
  }

  editTraining(trainingId) {
    return this.http.get('https://feedback-eb-new.herokuapp.com/trainingdetails/edit/' + trainingId);
  }
  deleteTraining(trainingId) {
    return this.http.post('https://feedback-eb-new.herokuapp.com/trainingdetails/delete/' + trainingId, 'delete');
  }

  updateTraining(updatedData) {
    return this.http.post('https://feedback-eb-new.herokuapp.com/trainingdetails/update/' + updatedData.id, updatedData);
  }
  getTrainingNameList() {
    return this.http.get('https://feedback-eb-new.herokuapp.com/trainingnames/list');
  }
  getTrainerNameList() {
    return this.http.get('https://feedback-eb-new.herokuapp.com/trainernames/list');
  }
  addTrainerName(name) {
    return this.http.post('https://feedback-eb-new.herokuapp.com/trainernames/add/', name);
  }
  getTrainingList() {
    return this.http.get('https://feedback-eb-new.herokuapp.com/trainingdetails/list');
  }

  addTrainingName(newTrainingDetails) {
    return this.http.post('https://feedback-eb-new.herokuapp.com/trainingnames/add/', newTrainingDetails);
  }

  getTrainingDetails(trainingId) {
    return this.http.get('https://feedback-eb-new.herokuapp.com/trainingdetails/details/' + trainingId);
  }
}

