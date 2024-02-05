import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.interface';
import { User } from '../models/user.interface';
import { CombinedPostListParams, PostListParams } from '../models/post-params.interface';
import { DataService } from 'src/app/shared/service/data.service';
import { BehaviorSubject, EMPTY, Subject, combineLatest, map, shareReplay, startWith, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  readonly baseUrl = environment.baseUrl

  private postFilterParams$ = new Subject<CombinedPostListParams>();
  postFilterActions$ = this.postFilterParams$.asObservable()

  constructor(private http: HttpClient,
    private dataService: DataService) { }

  userList$ = this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
    shareReplay()
  )

  postWithFilters$ = this.postFilterActions$.pipe(
    switchMap( (filters: PostListParams) => {
      return combineLatest([
        this.getPostList(filters),
        this.userList$
      ]).pipe(
        map( ([posts, users ]) => {
          return posts.map( (post) => {
            return ({
              ...post,
              userName: users ? users.find(user => user.id === post.userId)?.name : '-'
            }) as Post
          } )
        }),
      )
    }),
    shareReplay()
  )

  getPostList(filters: PostListParams){
    return this.http.get<Post[]>(
      `${this.baseUrl}/posts`, 
      this.dataService.optionsWithParams(filters)
    )
  }

  setPostFilter(params: CombinedPostListParams){
    this.postFilterParams$.next(params)
  }

}
