import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  /**
 * constructor makes MatDialog available to use through this.dialog
 * @param dialog 
 */
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }

  /**This is the function that will open the dialog when the signup button is clicked */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      //assigning the dialog a width
      width: '280px'
    });
  }

  /**function that will open the dialog when the log in button is clicked */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      //assigning the dialog a width
      width: '280px'
    });
  }
}
