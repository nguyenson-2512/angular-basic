import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/post.model';

export const GET_POST = '[Post] Get Posts';
export const GET_POST_SUCCESS = '[Post] Get Posts Success';
export const GET_POST_FAILURE = '[Post] Get Posts Failure';

export const CREATE_POST = '[Post] Create Post';
export const CREATE_POST_SUCCESS = '[Post] Create Post Success';
export const CREATE_POST_FAILURE = '[Post] Create Post Failure';

export const DELETE_POST = '[Post] Delete Post';
export const DELETE_POST_SUCCESS = '[Post] Delete Post Success';
export const DELETE_POST_FAILURE = '[Post] Delete Post Failure';

export const EDIT_POST = '[Post] Edit Post';
export const EDIT_POST_SUCCESS = '[Post] Edit Post Success';
export const EDIT_POST_FAILURE = '[Post] Edit Post Failure';


export const getPosts = createAction(
  GET_POST
);

export const getPostsSuccess = createAction(
  GET_POST_SUCCESS,
  props<any>()
);

export const getPostsFailure = createAction(
  GET_POST_FAILURE,
  props<{any}>()
);

export const createPost = createAction(
  CREATE_POST,
  props<{post: Post}>()
);

export const createPostSuccess = createAction(
  CREATE_POST_SUCCESS,
  props<any>()
);

export const createPostFailure = createAction(
  CREATE_POST_FAILURE,
  props<{any}>()
);

export const deletePost = createAction(
  DELETE_POST,
  props<{postid}>()
);

export const deletePostSuccess = createAction(
  DELETE_POST_SUCCESS,
  props<any>()
);

export const deletePostFailure = createAction(
  DELETE_POST_FAILURE,
  props<{any}>()
);

export const editPost = createAction(
  EDIT_POST,
  props<{post: Post}>()
);

export const editPostSuccess = createAction(
  EDIT_POST_SUCCESS,
  props<any>()
);

export const editPostFailure = createAction(
  EDIT_POST_FAILURE,
  props<{any}>()
);
