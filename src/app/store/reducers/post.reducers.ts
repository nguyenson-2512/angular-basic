import { Action, createReducer, on } from '@ngrx/store';
import { Post } from '../../models/post.model';
import * as postActions from '../actions/post.actions';
import * as _ from 'lodash'
import * as storage from '../state/storage.state';

export interface State {
  posts?: Post[];
  currentPost?: Post;
  deletePostId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  posts: storage.getItem('post').posts,
  currentPost: {},
  deletePostId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const postReducer = createReducer(
  initialState,

  on(postActions.getPosts, (state) => ({...state, isLoading: true})),
  on(postActions.getPostsSuccess, (state, result) => ({posts: result.response, isLoading: false, isLoadingSuccess: true})),

  on(postActions.createPost, (state, {post}) => ({...state, isLoading: true, currentPost: post})),
  on(postActions.createPostSuccess, (state, result) => {
    const posts = undefined !== state.posts ? _.cloneDeep(state.posts) : [];
    const currentPost = undefined !== state.currentPost ? _.cloneDeep(state.currentPost) : {};
    currentPost.id = result.postId;
    posts.push(currentPost);
    return {
      posts,
      isLoading: false,
      isLoadingSuccess: true
    };

  on(postActions.deletePost, (state, {postid}) => ({...state, isLoading: true, deletePostId: postid})),
  on(postActions.deletePostSuccess, (state, result) => {
    let posts = undefined !== state.posts ? _.cloneDeep(state.posts) : [];
    if (result.status) {
      posts = posts.filter(post => post.id !== state.deletePostId);
    }
    return {
      posts,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

   on(postActions.editPost, (state, {post}) => ({...state, isLoading: true, currentPost: post})),
   on(postActions.editPostSuccess, (state, result) => {
    let posts = undefined !== state.posts ? _.cloneDeep(state.posts) : [];
    const currentPost = undefined !== state.currentPost ? _.cloneDeep(state.currentPost) : {};
    posts = posts.map(post => {
      if (post.id === currentPost.id) {
        post = currentPost;
      }
      return post;
    });
    return {
      posts,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return postReducer(state, action);
}

export const getPosts = (state: State) => {
  return {
    posts: state.posts,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
