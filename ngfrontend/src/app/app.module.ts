import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { AuthService } from './services/auth.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { SearchblogComponent } from './searchblog/searchblog.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    SearchblogComponent,
    BlogComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
 
  ],
  providers: [AuthService,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }