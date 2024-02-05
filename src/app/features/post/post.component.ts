import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PostService } from './service/post.service';
import { CombinedPostListParams, PageIndexInterface, PostListParams } from './models/post-params.interface';

import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent, MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, combineLatest, finalize, map, of, startWith, switchMap, take, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Post } from './models/post.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

export interface PostListFormInterface{
    user: FormControl<number | string | any>;
    _search: FormControl<string | any>;
}

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  imports: [
    CommonModule, 
    MatTableModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule, 
    MatPaginatorModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
})
export class PostComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator

  displayedColumns: string[] = ['post', 'title', 'body', 'user', 'userName' ];
  
  postListFilterForm: FormGroup<PostListFormInterface> = this.fb.nonNullable.group<PostListParams>({
    user: this.fb.control<string | number | null>(''), 
    _search: new FormControl<string>(''),
  })

  postListFilters$ = new BehaviorSubject<Partial<PostListParams>>(this.postListFilterForm.value)
  pageEvent$ = new BehaviorSubject<PageIndexInterface>({ _start: 0, _limit: 5 })
  loadingSubject$ = new Subject<boolean>()

  constructor(private postService: PostService,
    private fb: FormBuilder){  }

    postList$ = combineLatest([
      this.postListFilterForm.valueChanges.pipe(
        tap( () => this.pageEvent$.next({ _start: 0, _limit: this.paginator.pageSize }) ),
        startWith({ user: '', _search: '' }),
      ),
      this.pageEvent$.asObservable()
    ]).pipe(
      tap( () => this.loadingSubject$.next(true) ),
      map( ([ filter, pages ]) => ({
        user: filter.user,
          _search: filter._search,
          _start: pages._start, 
          _limit: pages._limit
      }) ),
      switchMap( (filters: CombinedPostListParams) => {
        return combineLatest([
          this.postService.getPostList(filters),
          this.postService.userList$
        ]).pipe(
          map( ([posts, users ]) => {
            return posts.map( (post) => {
              return ({
                ...post,
                userName: users ? users.find(user => user.id === post.userId)?.name : '-'
              }) as Post
            } )
          }),
          tap( () => this.loadingSubject$.next(false) ),
        )
      }),
      catchError( (err) => of(EMPTY) ),
      finalize( () => this.loadingSubject$.next(false) )
    )
  
  usersList$ = this.postService.userList$

  vm$ = combineLatest([
    this.postList$,
    this.usersList$,
    this.loadingSubject$
  ]).pipe(
      map(([ posts, users, loader ]) => ({ posts, users, loader })) 
    )

  pageChange(page: PageEvent){
    this.pageEvent$.next({ 
      _start: page.pageSize * page.pageIndex,
      _limit: page.pageSize
    })
  }

}
