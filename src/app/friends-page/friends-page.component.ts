import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css']
})
export class FriendsPageComponent implements OnInit {

  constructor(private jwtHelper: JwtHelperService,private router: Router) { }

  ngOnInit(): void {
    let jwt = localStorage.getItem('JWT');
    if(jwt){
      if(this.jwtHelper.isTokenExpired(jwt)){
        localStorage.removeItem("JWT");
        this.router.navigate(['/main'])
      }
    }else{
      this.router.navigate(['/main'])
    }
  }

}
