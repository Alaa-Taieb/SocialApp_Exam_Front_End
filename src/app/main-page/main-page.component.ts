import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {



  constructor(private jwtHelper: JwtHelperService, private router: Router,) { }

  ngOnInit(): void {
    
    let jwt = localStorage.getItem('JWT');
    if(jwt){
      if(this.jwtHelper.isTokenExpired(jwt)){
        localStorage.removeItem("JWT");
        
      }else{
        this.router.navigate(['/friends']);
      }
    }else{
      console.log("No JWT");
    }
  }

}
