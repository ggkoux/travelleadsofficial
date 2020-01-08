import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';




const routes: Routes = [
  { path:'dashboard', component: DashboardComponent},
  { path:'blogs', component: BlogComponent},
  { path:'', component: HomeComponent},
  { path:'home', component: HomeComponent},
  { path:'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }