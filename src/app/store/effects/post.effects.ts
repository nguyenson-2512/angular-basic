import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import * as postActions from '../actions/post.actions';

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.getPosts),
      mergeMap((action) => this.postService.getAllPosts()),
        map((response) => {
        console.log('response:::', response);
        return postActions.getPostsSuccess({ response: response.data });
      }),
      catchError((error: any) => of(postActions.getPostsFailure(error)))
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.createPost),
      exhaustMap((action) =>
        this.postService
          .createPost(
            action.post.title,
            action.post.description,
            action.post.image
          )
          .pipe(
            map((response) =>  {
              console.log('response:::',response)
              return postActions.createPostSuccess(response)
            }),
            catchError((error: any) => of(postActions.createPostFailure(error)))
          )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.deletePost),
      exhaustMap((action) =>
        this.postService.deletePost(action.postid).pipe(
          map((response) => postActions.deletePostSuccess(response)),
          catchError((error: any) => of(postActions.deletePostFailure(error)))
        )
      )
    )
  );

  editPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.editPost),
      exhaustMap((action) =>
        this.postService
          .editPost(
            action.post._id,
            action.post.title,
            action.post.description,
            action.post.image
          )
          .pipe(
            map((response) => postActions.editPostSuccess(response)),
            catchError((error: any) => of(postActions.editPostFailure(error)))
          )
      )
    )
  );
}
