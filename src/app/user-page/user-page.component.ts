import { UserService } from 'src/app/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  private routeSub: Subscription;
  id: number;
  user: User;
  constructor(private jwtHelper: JwtHelperService,private route: ActivatedRoute, private userService: UserService, private router: Router) { }

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
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id = params['id'];
    });
    this.getUserById();
  }

  getUserById(){
    this.userService.getUserById(this.id).subscribe(res => {
      this.user = res;
    }, err => {
      console.log(err);
    })
  }

}
