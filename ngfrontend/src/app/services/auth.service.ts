import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpHeaders, HttpClient } from '@angular/common/http';

interface UserPostResponse {
  message: any;
  success: boolean
}

@Injectable()
export class AuthService {

  domain = "http://localhost:8080/"; // Development Domain - Not Needed in Production
  authToken;
  user;
  options;
  
  

  constructor(
    private httpClient: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    
    });

  }
  
  
  
  // Function to get token from client local storage
  loadToken() {
    this.authToken = localStorage.getItem('token');; // Get token and asssign to variable to be used elsewhere
  }

  // Function to register user accounts
  registerUser(user): Observable<UserPostResponse> {
    return this.httpClient.post<UserPostResponse>(this.domain + 'authentication/register', user,{ responseType: 'text' as 'json' });
  }

  // Function to check if username is taken
  checkUsername(username): Observable<UserPostResponse>  {
    return this.httpClient.get<UserPostResponse> (this.domain + 'authentication/checkUsername/' + username,{ responseType: 'text' as 'json' });
  }

  // Function to check if e-mail is taken
  checkEmail(email):Observable<UserPostResponse>  {
    return this.httpClient.get<UserPostResponse>(this.domain + 'authentication/checkEmail/' + email,{ responseType: 'text' as 'json' });
  }

  // Function to login user
  login(user): Observable<UserPostResponse> {
    return this.httpClient.post<UserPostResponse> (this.domain + 'authentication/login', user,{ responseType: 'text' as 'json' });
  }

  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }

  // Function to store user's data in client local storage
  storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

  // Function to get user's profile data
  getProfile() {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.httpClient.get(this.domain + 'authentication/profile', this.options,);
  }

  // Function to get public profile data
  getPublicProfile(username) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.httpClient.get(this.domain + 'authentication/publicProfile/' + username, this.options);
  }

  // Function to check if user is logged in
  loggedIn() {
    return this.jwtHelper.isTokenExpired();
  }

}
