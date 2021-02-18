import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import * as postActions from '../actions/post.actions';

@Injectable()
export class PostEffects {

  constructor(
    private actions$: Actions,
    private postService: PostService
  ) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.getTasks),
      exhaustMap(action =>
        this.postService.getposts().pipe(
          map(response => {
            console.log("response:::", response)
            return postActions.getPostsSuccess({response})
          }),
          catchError((error: any) => of(postActions.getPostsFailure(error))))
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.createTask),
      exhaustMap(action =>
        this.postService.addTask(action.post).pipe(
          map(response => postActions.createTaskSuccess(response)),
          catchError((error: any) => of(postActions.createPostFailure(error))))
      )
    )
  );


  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.deleteTask),
      exhaustMap(action => this.todoService.deleteTask(action.taskid).pipe(
          map(response => postActions.deleteTaskSuccess(response)),
          catchError((error: any) => of(postActions.deletePostFailure(error))))
      )
    )
  );

  editPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.editTask),
      exhaustMap(action =>
        this.todoService.editTask(action.task).pipe(
          map(response => todoActions.editTaskSuccess(response)),
          catchError((error: any) => of(postActions.editPostFailure(error))))
      )
    )
  );

}
