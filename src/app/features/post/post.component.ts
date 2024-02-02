import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Post } from './models/post.interface';
import { PostService } from './service/post.service';
import { PostListParams } from './models/post-params.interface';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  displayedColumns: string[] = ['post', 'title', 'body', 'user', 'userName' ];

  postListFilters: PostListParams = { _start: 0, _limit: 10 };
  postList$!: Observable<Post[]>

  constructor(private postService: PostService){
    
  }

  ngOnInit(): void {
    this.postService.setPostFilter(this.postListFilters)
    this.postList$ = this.postService.postWithFilters$;
    
  }

}
