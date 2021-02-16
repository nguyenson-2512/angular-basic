import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}get-posts`)
  }

  getPost(id: string ): Observable<Object> {
    return this.http.get(`${environment.apiUrl}post/${id}`)
  }

  createPost( title: string, description: string, image: string): Observable<Object> {
    return this.http.post(`${environment.apiUrl}create-post`,{
      title,
      description,
      image
    }, httpOptions)
  }

  deletePost(id: string): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}delete-post/${id}`)
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}delete-all`)
  }

  editPost(id: string, title: string, description: string, image: string): Observable<Object> {
    return this.http.put(`${environment.apiUrl}edit-post/${id}`,{
      title,
      description,
      image
    }, httpOptions)
  }
}
