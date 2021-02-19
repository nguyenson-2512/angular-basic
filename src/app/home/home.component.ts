import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { PostService } from '../services/post.service';
import * as postActions from '../store/actions/post.actions';
import * as fromRoot from '../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user;
  isLoggedIn = false;
  isEditing = false;
  idEditing: string = '';
  listOfPosts = [];
  postForm: any = {
    title: null,
    description: null,
    image: null,
  };

  ngOnInit(): void {

  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private readonly store: Store,
    private postService: PostService
  ) {
    this.store
    .select(fromRoot.getLoggedInUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      console.log('user', data)
      this.user = data.user
      this.isLoggedIn = true
    });

  this.store.dispatch(postActions.getPosts());

  this.store
    .select(fromRoot.getPosts)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.listOfPosts = data.posts
      console.log('data: ',data )
    } );
  }

  createPost() {
    const newPost = {
      title: this.postForm.title,
      description: this.postForm.description,
      image: this.postForm.image,
    };
    this.store.dispatch(postActions.createPost({ post: newPost }));
  }

  deletePost(postid: string) {
    console.log('deleting this post:::', postid);
    this.store.dispatch(postActions.deletePost({ postid }));
  }

  editPost() {
    this.store.dispatch(
      postActions.editPost({
        post: {
          _id: this.idEditing,
          title: this.postForm.title,
          description: this.postForm.description,
          image: this.postForm.image,
        },
      })
    );
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  deleteAllPosts(): void {
    this.postService.deleteAll().subscribe(
      (res) => {
        console.log('--', res);
        this.listOfPosts.length = 0;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  toggleEditPost(id: string): void {
    this.isEditing = true;
    this.idEditing = id;
  }


  handleCancel(): void {
    this.isEditing = false;
    this.idEditing = null;
  }
}
