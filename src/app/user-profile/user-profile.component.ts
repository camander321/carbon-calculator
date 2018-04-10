import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [AuthenticationService]
})
export class UserProfileComponent implements OnInit, DoCheck {
  user;
  constructor(private router:Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
  }

  ngDoCheck() {
    this.user = this.user;
  }

  deleteAccount() {
    if (confirm("Are you sure you'd like to delete your account?")) {
      this.authService.deleteAccount();
      this.router.navigate(['']);
    }
  }
}
