import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Subject, combineLatest, map } from 'rxjs';
import { CombinedPostListParams, PostListParams } from '../post/models/post-params.interface';
import { PostAlternateService } from './services/post-alternate.service';

@Component({
  selector: 'app-alternate',
  standalone: true,
  templateUrl: './alternate.component.html',
  styleUrls: ['./alternate.component.scss'],
  imports: [
    CommonModule,
    MatTableModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule, 
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
})
export class AlternateComponent {

  displayedColumns: string[] = ['post', 'title', 'body', 'user', 'userName' ];
  
  postListParams: CombinedPostListParams = { _start: 0, _limit: 5, user: '', _search: '' }

  postListFilters$ = new BehaviorSubject<CombinedPostListParams>(this.postListParams)

  constructor(private postService: PostAlternateService){  }

  postList$ = this.postService.postWithFilters$;
  usersList$ = this.postService.userList$

  vm$ = combineLatest([
    this.postList$,
    this.usersList$,
    this.postService.loaderSubject
  ]).pipe(
      map(([ posts, users, loader ]) => ({ posts, users, loader })) 
    )

  pageChange(page: PageEvent){
    this.postListParams = {
      ...this.postListParams,
      _start: page.pageSize * page.pageIndex,
      _limit: page.pageSize
    }
    this.postService.setPostFilter(this.postListParams)
  }

  changeUser(user: MatSelectChange){
    this.postListParams = {
      ...this.postListParams,
      user: user.value,
      _start: 0
    }
    this.postService.setPostFilter(this.postListParams)
  }

  changeSearch(search: Event){
    this.postListParams = {
      ...this.postListParams,
      _search: (search.target as HTMLInputElement).value,
      _start: 0
    }
    this.postService.setPostFilter(this.postListParams)
  }

}
