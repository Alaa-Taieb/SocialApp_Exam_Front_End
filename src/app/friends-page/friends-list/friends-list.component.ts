import { Router } from '@angular/router';
import { SharedService } from './../../friends-list/shared-service.service';
import { UserService } from './../../user/user.service';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/user/user';
import jwt_decode from 'jwt-decode';
import { EventEmitter } from 'stream';
import { Subscription } from 'rxjs';


interface FriendsDisplay{
  alias: string,
  action: User
}

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})


export class FriendsListComponent implements OnInit {
  clickEventsubscription:Subscription;
  displayedColumns: string[] = ['alias', 'action'];
  //dataSource = new MatTableDataSource<User>(USER_DATA);
  current_user: User;
  dataSource = new MatTableDataSource<FriendsDisplay>();
  friends: User[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  
  constructor(private userService: UserService, private sharedService: SharedService, private router: Router) {
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.getCurrentUser();
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
    
  }

  test(){
    alert("Before YES");
    this.sharedService.sendClickEvent();
  }

  getFriends(){
    this.userService.getUserFriends(this.current_user.id).subscribe((res) => {
      this.friends = res;
      this.buildDataSource(res);
      console.log(this.dataSource);
    }, (err) => {
      alert("Couldn't get user friends!");  
    })
  }

  getEmailFromJWT(){
    try{
      let tokenInfo: any = jwt_decode(localStorage.getItem("JWT"));
      return tokenInfo.sub;
    }catch{
      return null;
    }
  }

  getCurrentUser(){
    let user_email: string = this.getEmailFromJWT();
    this.userService.getUserByEmail(user_email).subscribe((res) => {
      this.current_user = res;
      //console.log(res);
      this.getFriends();
    }, (err) => {
      alert("User not found!");
    })
  }

  buildDataSource(friends: User[]){
    let ret = new Array();
    friends.forEach(el => {
      let dis: FriendsDisplay = {alias: el.alias, action: el}
      ret.push(dis);
    })
    this.dataSource.data = ret;
  }

  removeFriend(friend: User){
    this.userService.removeFriend(this.current_user.id, friend.id).subscribe(res => {
      console.log("Removed Successfully");
      this.getCurrentUser();
      this.sharedService.sendClickEvent();
    }, err => {
      console.log(err);
    })
  }

  expandUserInfo(user: User){
    this.router.navigate([`/user/${user.id}`]);
  }
}
