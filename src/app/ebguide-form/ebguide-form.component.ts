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
  selector: 'app-ebguide-form',
  templateUrl: './ebguide-form.component.html',
  styleUrls: ['./ebguide-form.component.css']
})

export class EBGuideFormComponent implements OnInit {

  trainingform = '';
  public href = '';
  TrainingDetails = {};
  trainingName = '';
  trainerNames = '';
  trainingLocation = '';
  trainingDate = '';
  submitted = false;
  trainersPresentationRatingArr = [];
  trainersUnderstandabilityRatingArr = [];
  trainersExpertiseRatingArr = [];
  trainersInteractionRatingArr = [];
  presentation_sum = 0;
  understanding_sum = 0;
  expertise_sum = 0;
  interaction_sum = 0;
  p_rating = false;
  u_rating = false;
  e_rating = false;
  i_rating = false;

  form = this.fb.group({
    participantName: this.fb.group({

      id_name: [''],
    }),
    training_n: this.fb.group({

      training_name: [''],
    }),
    trainer_n: this.fb.group({

      trainer_names: [''],
    }),
    training_location: this.fb.group({

      location_name: [''],
    }),
    training_date: this.fb.group({

      t_date: [''],
    }),
    question_1: this.fb.group({

      arch_overview_content: ['', Validators.required],
      arch_overview_presentation: ['', Validators.required],
      GUI_c: ['', Validators.required],
      GUI_p: ['', Validators.required],
      first_model_c: ['', Validators.required],
      first_model_p: ['', Validators.required],
      add_model_c: ['', Validators.required],
      add_model_p: ['', Validators.required],
      templates_c: ['', Validators.required],
      templates_p: ['', Validators.required],
      add_func_c: ['', Validators.required],
      add_func_p: ['', Validators.required],
      srcoll_c: ['', Validators.required],
      srcoll_p: ['', Validators.required],
      enhance_c: ['', Validators.required],
      enhance_p: ['', Validators.required],
      conditional_c: ['', Validators.required],
      conditional_p: ['', Validators.required],
      goBack_c: ['', Validators.required],
      goBack_p: ['', Validators.required],
      popup_c: ['', Validators.required],
      popup_p: ['', Validators.required],
      multiple_c: ['', Validators.required],
      multiple_p: ['', Validators.required],
      focus_c: ['', Validators.required],
      focus_p: ['', Validators.required],
      languages_c: ['', Validators.required],
      languages_p: ['', Validators.required],
      speech_c: ['', Validators.required],
      speech_p: ['', Validators.required],
      objects_c: ['', Validators.required],
      objects_p: ['', Validators.required],

    }),
    question_2: this.fb.group({
      missed_topic: ['', Validators.required]
    }),
    question_3: this.fb.group({
      content: ['', Validators.required],
      practical: ['', Validators.required],
      comprehensibility: ['', Validators.required],
    }),
    question_4: this.fb.group({
      struct: ['', Validators.required],
      time: ['', Validators.required],
      rating: ['', Validators.required],
    }),
    question_5: this.fb.group({

      org: ['', Validators.required],
      location: ['', Validators.required],
      catr: ['', Validators.required],
    }),

    question_6: this.fb.group({
      suggestions: ['', Validators.required],
    })
  });
  constructor(private fb: FormBuilder, private httpService: HttpService,
    private router: Router) { }

  ngOnInit() {
    // document.getElementById('main_hd').style.display = "none";
    this.href = this.router.url;
    this.trainingform = this.href.split('/').pop();
    console.log(this.trainingform);
    this.httpService.getTrainingDetails(this.trainingform).subscribe(response => {
      console.log(response);
      this.TrainingDetails = response as {};
      this.trainingName = this.TrainingDetails['training'];
      this.trainerNames = this.TrainingDetails['trainers'].toString();

      this.trainingLocation = this.TrainingDetails['location'];
      if (this.TrainingDetails['from_date'] == this.TrainingDetails['to_date']) {
        this.trainingDate = this.TrainingDetails['from_date'];
      } else {
        this.trainingDate = this.TrainingDetails['from_date'] + ' to ' + this.TrainingDetails['to_date'];
      }

      for (let i = 0; i < this.TrainingDetails['trainers'].length; i++) {
        this.trainersPresentationRatingArr[i] = { 'name': this.TrainingDetails['trainers'][i], 'rating': 0 };
        this.trainersUnderstandabilityRatingArr[i] = { 'name': this.TrainingDetails['trainers'][i], 'rating': 0 };
        this.trainersExpertiseRatingArr[i] = { 'name': this.TrainingDetails['trainers'][i], 'rating': 0 };
        this.trainersInteractionRatingArr[i] = { 'name': this.TrainingDetails['trainers'][i], 'rating': 0 };
      }

    });
  }

  onSubmit() {
    this.submitted = true;
    this.p_rating = false;
    this.u_rating = false;
    this.e_rating = false;
    this.i_rating = false;

    for (let i = 0; i < this.trainersPresentationRatingArr.length; i++) {

      if (this.trainersPresentationRatingArr[i]['rating'] === 0 && this.p_rating === false) {
        this.p_rating = true;
      }
      if (this.trainersUnderstandabilityRatingArr[i]['rating'] === 0 && this.u_rating === false) {
        this.u_rating = true;
      }
      if (this.trainersExpertiseRatingArr[i]['rating'] === 0 && this.e_rating === false) {
        this.e_rating = true;
      }
      if (this.trainersInteractionRatingArr[i]['rating'] === 0 && this.i_rating === false) {
        this.i_rating = true;
      }
    }

    console.log(JSON.stringify(this.form.value));
    if (this.form.valid && this.p_rating === false && this.u_rating === false && this.e_rating === false && this.i_rating === false) {
      this.convertResponseToPost(this.form.value);
      console.log('success');
    }

  }

  handleChange(evt, index, topic) {
    console.log(topic);
    if (topic === 'presentation') {
      this.trainersPresentationRatingArr[index]['rating'] = parseInt(evt.target.value);
      console.log(this.trainersPresentationRatingArr[index]['rating']);
    } else if (topic === 'understanding') {
      this.trainersUnderstandabilityRatingArr[index]['rating'] = parseInt(evt.target.value);
    } else if (topic === 'expertise') {
      this.trainersExpertiseRatingArr[index]['rating'] = parseInt(evt.target.value);
    } else {
      this.trainersInteractionRatingArr[index]['rating'] = parseInt(evt.target.value);
    }

    this.presentation_sum = 0;
    this.understanding_sum = 0;
    this.expertise_sum = 0;
    this.interaction_sum = 0;
    this.p_rating = false;
    this.u_rating = false;
    this.e_rating = false;
    this.i_rating = false;

    for (let i = 0; i < this.trainersPresentationRatingArr.length; i++) {
      this.presentation_sum += this.trainersPresentationRatingArr[i]['rating'];
      this.understanding_sum += this.trainersUnderstandabilityRatingArr[i]['rating'];
      this.expertise_sum += this.trainersExpertiseRatingArr[i]['rating'];
      this.interaction_sum += this.trainersInteractionRatingArr[i]['rating'];

      if (this.trainersPresentationRatingArr[i]['rating'] === 0 && this.p_rating === false) {
        this.p_rating = true;
      }
      if (this.trainersUnderstandabilityRatingArr[i]['rating'] === 0 && this.u_rating === false) {
        this.u_rating = true;
      }
      if (this.trainersExpertiseRatingArr[i]['rating'] === 0 && this.e_rating === false) {
        this.e_rating = true;
      }
      if (this.trainersInteractionRatingArr[i]['rating'] === 0 && this.i_rating === false) {
        this.i_rating = true;
      }
    }

    this.presentation_sum = this.presentation_sum / this.trainersPresentationRatingArr.length;
    this.understanding_sum = this.understanding_sum / this.trainersPresentationRatingArr.length;
    this.expertise_sum = this.expertise_sum / this.trainersPresentationRatingArr.length;
    this.interaction_sum = this.interaction_sum / this.trainersPresentationRatingArr.length;


  }
  convertResponseToPost(formValue) {

    const finalResponse = {
      'name': this.form.controls['participantName'].value.id_name,
      'training': this.trainingName,
      'trainers': this.trainerNames,
      'location': this.trainingLocation,
      'date': this.trainingDate,
      'questions': [{
        'question': 'Content',
        'question_type': 'rating',
        'answer': '',
        'comments': '',
        'subquestions': [{
          'sub_ques': 'Architectural overview',
          'content_rating': this.form.controls['question_1'].value.arch_overview_content,
          'presentation_rating': this.form.controls['question_1'].value.arch_overview_presentation,
        },
        {
          'sub_ques': 'Components of the GUI',
          'content_rating': this.form.controls['question_1'].value.GUI_c,
          'presentation_rating': this.form.controls['question_1'].value.GUI_p
        },
        {
          'sub_ques': 'Creating your first EB GUIDE model',
          'content_rating': this.form.controls['question_1'].value.first_model_c,
          'presentation_rating': this.form.controls['question_1'].value.first_model_p
        },
        {
          'sub_ques': 'Adding behaviour to your EB GUIDE model',
          'content_rating': this.form.controls['question_1'].value.add_model_c,
          'presentation_rating': this.form.controls['question_1'].value.add_model_p
        },
        {
          'sub_ques': 'Working with templates',
          'content_rating': this.form.controls['question_1'].value.templates_c,
          'presentation_rating': this.form.controls['question_1'].value.templates_p
        },
        {
          'sub_ques': 'Adding more functionality using widget features',
          'content_rating': this.form.controls['question_1'].value.add_func_c,
          'presentation_rating': this.form.controls['question_1'].value.add_func_p
        },
        {
          'sub_ques': 'Creating a scrollable list with dynamic content',
          'content_rating': this.form.controls['question_1'].value.srcoll_c,
          'presentation_rating': this.form.controls['question_1'].value.srcoll_p
        },
        {
          'sub_ques': 'Enhancing your EB GUIDE model with animations',
          'content_rating': this.form.controls['question_1'].value.enhance_c,
          'presentation_rating': this.form.controls['question_1'].value.enhance_p
        },
        {
          'sub_ques': 'Adding conditional behaviour',
          'content_rating': this.form.controls['question_1'].value.conditional_c,
          'presentation_rating': this.form.controls['question_1'].value.conditional_p
        },
        {
          'sub_ques': 'Modeling go-back functionality with history states',
          'content_rating': this.form.controls['question_1'].value.goBack_c,
          'presentation_rating': this.form.controls['question_1'].value.goBack_p
        },
        {
          'sub_ques': 'Modeling pop-ups with dynamic state machines',
          'content_rating': this.form.controls['question_1'].value.popup_c,
          'presentation_rating': this.form.controls['question_1'].value.popup_p
        },
        {
          'sub_ques': 'Working with multiple state machines',
          'content_rating': this.form.controls['question_1'].value.multiple_c,
          'presentation_rating': this.form.controls['question_1'].value.multiple_p
        },
        {
          'sub_ques': 'Dealing with focus and key input features',
          'content_rating': this.form.controls['question_1'].value.focus_c,
          'presentation_rating': this.form.controls['question_1'].value.focus_p
        },
        {
          'sub_ques': 'Adding support for multiple languages',
          'content_rating': this.form.controls['question_1'].value.languages_c,
          'presentation_rating': this.form.controls['question_1'].value.languages_p
        },
        {
          'sub_ques': 'Working with EB GUIDE Speech',
          'content_rating': this.form.controls['question_1'].value.speech_c,
          'presentation_rating': this.form.controls['question_1'].value.speech_p
        },
        {
          'sub_ques': 'Working with 3D objects',
          'content_rating': this.form.controls['question_1'].value.objects_c,
          'presentation_rating': this.form.controls['question_1'].value.objects_p
        }
        ]
      },
      {
        'question': 'Which important topic did you miss?',
        'question_type': '',
        'answer': this.form.controls['question_2'].value.missed_topic,
        'comments': '',
        'subquestions': []
      },
      {
        'question': 'Exercises',
        'question_type': '',
        'answer': '',
        'comments': '',
        'subquestions': [{
          'sub_ques': 'Content',
          'content_rating': '',
          'presentation_rating': this.form.controls['question_3'].value.content
        },
        {
          'sub_ques': 'Practical use',
          'content_rating': '',
          'presentation_rating': this.form.controls['question_3'].value.practical
        },
        {
          'sub_ques': 'Comprehensibility',
          'content_rating': '',
          'presentation_rating': this.form.controls['question_3'].value.comprehensibility
        }
        ]
      },
      {
        'question': 'Did this training meet your expectations?',
        'question_type': '',
        'answer': this.form.controls['question_4'].value.valuable_comment,
        'comments': '',
        'subquestions': [
          {
            'sub_ques': 'Structuring',
            'content_rating': '',
            'presentation_rating': this.form.controls['question_4'].value.struct
          },
          {
            'sub_ques': 'Time management',
            'content_rating': '',
            'presentation_rating': this.form.controls['question_4'].value.time
          },
          {
            'sub_ques': 'Overall rating',
            'content_rating': '',
            'presentation_rating': this.form.controls['question_4'].value.rating
          }
        ]
      },
      {
        'question': 'General Conditions (optional)',
        'question_type': '',
        'answer': '',
        'comments': '',
        'subquestions': [
          {
            'sub_ques': 'Organization',
            'content_rating': '',
            'presentation_rating': this.form.controls['question_5'].value.org
          },
          {
            'sub_ques': 'Location',
            'content_rating': '',
            'presentation_rating': this.form.controls['question_5'].value.location
          },
          {
            'sub_ques': 'Catering',
            'content_rating': '',
            'presentation_rating': this.form.controls['question_5'].value.catr
          }

        ]
      },
      {
        'question': 'How long did you already work with EB Product (Months r Years)',
        'question_type': '',
        'answer': this.form.controls['question_6'].value.suggestions,
        'comments': '',
        'subquestions': []
      }
      ]
    };
    console.log(finalResponse);
    this.makeApiCall(finalResponse);
  }
  makeApiCall(payload) {
    this.httpService.saveEbGuideForm(payload).subscribe(a => {
      console.log(a);
      if (a.status === 200) {
        this.router.navigate(['success']);
      } else {
        alert('Some Error Occured. Please Try Again!');
      }
    });
  }

}
