import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { SearchblogComponent } from './searchblog/searchblog.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    SearchblogComponent,
    BlogComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }