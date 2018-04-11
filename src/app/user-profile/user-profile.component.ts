import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [AuthenticationService, SurveyService]
})
export class UserProfileComponent implements OnInit, DoCheck {
  user;
  userSurveys;
  renderLineChart: boolean = false;
  constructor(private router:Router, private authService: AuthenticationService, private surveyService: SurveyService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user
      if (this.user) {
        this.surveyService.getSurveysByUID(this.user.uid).subscribe(dataLastEmittedFromObserver => {
          this.userSurveys = dataLastEmittedFromObserver;
          this.renderLineChart = true;
        });
      }

    });

  }

  ngDoCheck() {
    this.user = this.user;
  }

  setGoals() {
    this.router.navigate(['survey', 'goal']);
  }

  deleteAccount() {
    if (confirm("Are you sure you'd like to delete your account?")) {
      this.router.navigate(['']);
      this.authService.deleteAccount();
    }
  }
}
