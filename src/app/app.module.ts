import { TokenInterceptorService } from './request-interceptor/token-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterComponent } from './main-page/register/register.component';
import { LoginComponent } from './main-page/login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FriendsPageComponent } from './friends-page/friends-page.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorComponent } from './popups/error/error.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { FriendsListComponent } from './friends-page/friends-list/friends-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NonFriendsListComponent } from './friends-page/non-friends-list/non-friends-list.component';
import { UserPageComponent } from './user-page/user-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RegisterComponent,
    LoginComponent,
    FriendsPageComponent,
    ErrorComponent,
    HeaderComponent,
    FriendsListComponent,
    NonFriendsListComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    },
    { 
      provide: JWT_OPTIONS, 
      useValue: JWT_OPTIONS 
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
