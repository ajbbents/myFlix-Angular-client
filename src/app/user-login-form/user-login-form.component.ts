import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { UserName: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * function responsible for sending the form inputs to the backend
   * If login is successful, user's data and token is stored in local storage
   * Login form closes and user is taken to the list of all movies via the navigation router
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      //logic for successful user login goes here
      let user = result.user.UserName;
      let token = result.token;
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);
      this.dialogRef.close();
      this.router.navigate(['movies']);
      this.snackBar.open('successfully logged in', 'okay', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'okay', {
        duration: 2000
      });
    });
  }
}
