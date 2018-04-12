import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../models/survey.model';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [SurveyService, AuthenticationService, UserService]
})
export class SurveyComponent implements OnInit {
  flown: number;
  test:number = 100;
  openSurvey: Survey = new Survey()
  currentQuestion: string = "animalProduct";
  user;
  constructor(private surveyService: SurveyService, private authService: AuthenticationService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.openSurvey.calculate;
    this.authService.user.subscribe(user => {
      this.user = user;
    });
    this.calculate();
  }
  submitSurvey() {
    if (this.router.url == "/survey/goal") {
      this.surveyService.saveGoal(this.openSurvey, this.user);
      this.openSurvey = new Survey();
      this.router.navigate(['user']);
    }else {
      if (this.user) {
        this.surveyService.saveSurvey(this.openSurvey, this.user);
        this.openSurvey = new Survey();
        this.router.navigate(['user']);
      } else {
        this.openSurvey.keepSurvey();
        this.router.navigate(['login']);
      }
    }
  }

  calculate() {
    this.openSurvey.calculate();
  }

  mouseEnter(question: string) {
    this.currentQuestion = question;
  }

  animalProductSubtext() {
    let number = this.openSurvey.animalProduct;
    if (number == 0) return "Never (vegan)";
    if (number < .75) return "Infrequently (vegetarian)";
    if (number < 1.5) return "Occasionally (lots of veggies)";
    if (number < 2.25) return "Often (balanced)";
    return "Very Often (meat daily)";
  }

  squareFeetSubtext() {
    return this.openSurvey.squareFeet + " square feet";
  }

  peopleInHomeSubtext() {
    return this.openSurvey.peopleInHome + " people";
  }

  energySubtext() {
    let number = parseFloat(this.openSurvey.energy);
    if (number < 3) return "Efficiency-centered design";
    if (number < 4) return "Above average";
    if (number < 5) return "Average";
    if (number < 6) return "Below average";
    return "Very inefficient (poor insulation, etc.)";
  }

  trashSubtext() {
    let number = parseFloat(this.openSurvey.animalProduct);
    if (number == 0) return "Much less";
    if (number < 2) return "Less";
    if (number < 4) return "Same";
    if (number < 6) return "More";
    return "Much more";
  }


  hoursFlownSubtext() {
    return this.openSurvey.hoursFlown + " hours"
    if (number == 0) return "Never (vegan)";
    if (number < .75) return "Infrequently (vegetarian)";
    if (number < 1.5) return "Occasionally (really like veggies)";
    if (number < 2.25) return "Often (balanced meat/veggies)";
    return "Very Often (meat daily)";
  }
}
