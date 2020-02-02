import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './success/success.component';
import { ExcelService } from './services/excel.services';
import { CreatetrainingComponent } from './createtraining/createtraining.component';
import { ListTrainingsComponent } from './list-trainings/list-trainings.component';
import { TrainingformComponent } from './trainingform/trainingform.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { SelectboxPipe } from './selectbox.pipe';

import { AddTrainingComponent } from './list-trainings/add-training/add-training.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// tslint:disable-next-line:max-line-length
import { MatListModule, MatSelectModule, MatOptionModule, MatButtonModule,MatCardModule, MatDialogModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TrainingQualificationComponent } from './charts/training-qualification/training-qualification.component';
import { TrainingExperienceComponent } from './charts/training-experience/training-experience.component';
import { GraphicalpresentationComponent } from './graphicalpresentation/graphicalpresentation.component';
import { OrderModule } from 'ngx-order-pipe';
import { TrainerQualificationComponent } from './charts/trainer-qualification/trainer-qualification.component';
import { LoginComponent } from './login/login.component';
import { EBGuideFormComponent } from './ebguide-form/ebguide-form.component';
import { GraphicalRepresentationComponent } from './graphical-representation/graphical-representation.component';
import { ListEBGuideComponent } from './list-ebguide/list-ebguide.component';
import { UsersComponent } from './users/users.component';
import { TrainingGroupsComponent } from './training-groups/training-groups.component';
import { FilterPipe } from './shared/filter.pipe';
import { AppGlobals } from './shared/global';
import { DirectAccessGuard } from './shared/directAccessGuard';
import { DataTablesModule } from 'angular-datatables';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { GraphEbguideComponent } from './graph-ebguide/graph-ebguide.component';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'login', component:LoginComponent },
  { path: 'home', component: ListTrainingsComponent },
  { path: 'list', component: ListComponent },
  { path: 'form', component: FormComponent },
  { path: 'createtraining', component: CreatetrainingComponent },
  { path: 'traininglist', component: ListTrainingsComponent },
  { path: 'analysis', component: PieChartComponent },
  { path: 'content', component: BarChartComponent },
  { path: 'trainingqualification', component: TrainingQualificationComponent },
  { path: 'trainerqualification', component: TrainerQualificationComponent },
  { path: 'trainingexperience', component: TrainingExperienceComponent },
  { path: 'trainingform/:id', component: TrainingformComponent },
  { path: 'ebguideform/:id', component: EBGuideFormComponent},
  { path: 'success', component: SuccessComponent },
  { path: 'graphs', component: GraphicalpresentationComponent },
  { path: 'graphicalRepresentation', component: GraphicalRepresentationComponent },
  { path: 'list-ebguide', component: ListEBGuideComponent },
  { path: 'users', component: UsersComponent },
  { path: 'trainingGroups', component:  TrainingGroupsComponent},
  { path: 'home/:users/:trainingGroups/:list/:list-ebguide', component: LoginComponent, canActivate: [DirectAccessGuard] },
  //{ path: 'users', component: LoginComponent, canActivate: [DirectAccessGuard] },
  //{ path: 'trainingGroups', component: LoginComponent, canActivate: [DirectAccessGuard] },
  { path: 'list', component: ListComponent, canActivate: [DirectAccessGuard] },
 
  { path: 'ebguide-graph', component: GraphEbguideComponent }
  
];
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent,
    SuccessComponent,
    CreatetrainingComponent,
    ListTrainingsComponent,
    TrainingformComponent,
    HomeComponent,
    SelectboxPipe,
   
    FilterPipe,
    AddTrainingComponent,
    BarChartComponent,
    AnalysisComponent,
    PieChartComponent,
    TrainingQualificationComponent,
    TrainingExperienceComponent,
    GraphicalpresentationComponent,
    TrainerQualificationComponent,
    LoginComponent,
    EBGuideFormComponent,
    GraphicalRepresentationComponent,
    ListEBGuideComponent,
    UsersComponent,
    TrainingGroupsComponent,
    GraphEbguideComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    DataTablesModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatOptionModule,
    OrderModule,
    NgxUiLoaderModule

  ],
  exports: [SelectboxPipe,FilterPipe],
  providers: [ExcelService,AppGlobals,DirectAccessGuard ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddTrainingComponent
  ]
})
export class AppModule {

  
 }
