import { ErrorComponent } from './../../popups/error/error.component';
import { Router } from '@angular/router';
import { AuthenticationRequest } from './../../user/authentication-request';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Error } from 'src/app/popups/error/error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  request: AuthenticationRequest;

  constructor( private fb: FormBuilder, private userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['',[
        Validators.required,
        Validators.email
      ]],
      password: ['',[
        Validators.required,
        Validators.minLength(5)
      ]]
    });
  }

  get email(){
    return this.myForm.get('email');
  }

  get password(){
    return this.myForm.get('password');
  }

  async authenticate(){
    // Send an authentication request to the back end!
    this.request = {} as AuthenticationRequest;
    this.request.email = this.myForm.get('email').value;
    this.request.password = this.myForm.get('password').value;
    this.userService.authenticate(this.request).subscribe((res) => {
      localStorage.setItem('JWT', res.token);
      this.router.navigate(['/friends']);
    }, (err) => {
      let error: Error = {title:"Authentication Error" , code: "403", message: "Failed to athenticate with the provided credentials."};
      const dialogRef = this.dialog.open(ErrorComponent, {
        data: error,
        width: "400px",
        height: "285px"
      });
      dialogRef.afterClosed().subscribe(res => {
        this.myForm.reset();
      })
    })

  }

}
