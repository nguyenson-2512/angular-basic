import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  isEditing = false;
  idEditing: string = ''
  listOfPosts = [] ;
  postForm: any = {
    title: null,
    description: null,
    image: null
  }

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.listOfPosts = data.data;
        console.log('---posts:', this.listOfPosts)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createPost(): void {
    this.postService.createPost(this.postForm.title, this.postForm.description, this.postForm.image).subscribe(
      res => {
        console.log('--',res['data'])
        this.listOfPosts.push(res['data'])
      },
      err => {
        console.log(err)
      }
    )
  }

  deletePost(id: string): void {
    this.postService.deletePost(id).subscribe(
      res => {
        this.listOfPosts = this.listOfPosts.filter(p =>  p._id !== id)
        console.log('--',res)
      },
      err => {
        console.log(err)
      }
    )
  }

  deleteAllPosts(): void {
    this.postService.deleteAll().subscribe(
      res => {
        console.log('--',res)
        this.listOfPosts.length = 0
      },
      err => {
        console.log(err)
      }
    )
  }

  toggleEditPost(id: string): void {
    this.isEditing = true
    this.idEditing = id
  }

  editPost(): void {
    this.postService.editPost(this.idEditing,this.postForm.title, this.postForm.description, this.postForm.image).subscribe(
      res => {
        console.log('--',res)
        window.location.reload();
        // const index = this.listOfPosts.findIndex((p) => p._id === this.idEditing);
        // console.log('index',index)
        // this.listOfPosts = [
        //   ...this.listOfPosts.slice(0, index),
        //     ...res['post'],
        //   ...this.listOfPosts.slice(index + 1),
        // ];
      },
      err => {
        console.log(err)
      }
    )
  }

  handleCancel(): void {
    this.isEditing = false
    this.idEditing = null
  }

}
