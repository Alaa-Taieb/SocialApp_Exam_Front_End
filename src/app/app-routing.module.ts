import { UserPageComponent } from './user-page/user-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsPageComponent } from './friends-page/friends-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path: 'main', component: MainPageComponent},
  {path: '', pathMatch:"full", redirectTo: 'main'},
  {path: 'friends', component: FriendsPageComponent},
  {path: 'user/:id', component: UserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
