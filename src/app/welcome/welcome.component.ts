import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../models/survey.model';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [SurveyService]
})
export class WelcomeComponent implements OnInit {
  flown: number;
  openSurvey: Survey = new Survey()
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
  }

  submitSurvey() {
    this.surveyService.saveSurvey(this.openSurvey);
    this.openSurvey = new Survey();
  }
}
