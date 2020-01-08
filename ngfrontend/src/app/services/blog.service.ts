import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class BlogService {

  options;
  domain = this.authService.domain;
  httpClient;

  constructor(
    private authService: AuthService,
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

  // Function to create a new blog post
  newBlog(blog) {
    this.createAuthenticationHeaders(); // Create headers
    return this.httpClient.post(this.domain + 'blogs/newBlog', blog, this.options).map(res => res.json());
  }

  // Function to get all blogs from the database
  getAllBlogs() {
    this.createAuthenticationHeaders(); // Create headers
    return this.httpClient.get(this.domain + 'blogs/allBlogs', this.options).map(res => res.json());
  }

  // Function to get the blog using the id
  getSingleBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.httpClient.get(this.domain + 'blogs/singleBlog/' + id, this.options).map(res => res.json());
  }

  // Function to edit/update blog post
  editBlog(blog) {
    this.createAuthenticationHeaders(); // Create headers
    return this.httpClient.put(this.domain + 'blogs/updateBlog/', blog, this.options).map(res => res.json());
  }

  // Function to delete a blog
  deleteBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.httpClient.delete(this.domain + 'blogs/deleteBlog/' + id, this.options).map(res => res.json());
  }

  // Function to like a blog post
  likeBlog(id) {
    const blogData = { id: id };
    return this.httpClient.put(this.domain + 'blogs/likeBlog/', blogData, this.options).map(res => res.json());
  }

  // Function to dislike a blog post
  dislikeBlog(id) {
    const blogData = { id: id };
    return this.httpClient.put(this.domain + 'blogs/dislikeBlog/', blogData, this.options).map(res => res.json());
  }

  // Function to post a comment on a blog post
  postComment(id, comment) {
    this.createAuthenticationHeaders(); // Create headers
    // Create blogData to pass to backend
    const blogData = {
      id: id,
      comment: comment
    }
    return this.httpClient.post(this.domain + 'blogs/comment', blogData, this.options).map(res => res.json());

  }

}
