import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  catchError,
  combineLatest,
  debounceTime,
  map,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CombinedPostListParams,
  PostListParams,
} from '../../post/models/post-params.interface';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/shared/service/data.service';
import { User } from '../../post/models/user.interface';
import { Post } from '../../post/models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostAlternateService {
  readonly baseUrl = environment.baseUrl;

  private postListParams: CombinedPostListParams = {
    _start: 0,
    _limit: 5,
    user: '',
    _search: '',
  };
  private postFilterParams$ = new BehaviorSubject<CombinedPostListParams>(
    this.postListParams
  );
  postFilterActions$ = this.postFilterParams$.asObservable();
  loaderSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private dataService: DataService) {}

  userList$ = this.http
    .get<User[]>(`${this.baseUrl}/users`)
    .pipe(shareReplay());

  postWithFilters$ = this.postFilterActions$.pipe(
    tap(() => this.loaderSubject.next(true)),
    switchMap((filters: CombinedPostListParams) => {
      const savedFilters: CombinedPostListParams | null = this.getFilter();
      const modifiedFilters: CombinedPostListParams = savedFilters
        ? { ...filters, ...savedFilters }
        : filters;
      console.log(savedFilters);
      this.saveFilters(modifiedFilters);
      return combineLatest([
        this.getPostList(filters),
        this.userList$,
      ]).pipe(
        map(([posts, users]) => {
          return posts.map((post) => {
            return {
              ...post,
              userName: users
                ? users.find((user) => user.id === post.userId)?.name
                : '-',
            } as Post;
          });
        })
      );
    }),
    shareReplay(),
    tap(() => this.loaderSubject.next(false)),
    catchError((err) => {
      this.loaderSubject.next(false);
      return throwError(err);
    })
  );

  getPostList(filters: PostListParams) {
    return this.http.get<Post[]>(
      `${this.baseUrl}/posts`,
      this.dataService.optionsWithParams(filters)
    );
  }

  setPostFilter(params: CombinedPostListParams) {
    this.postFilterParams$.next(params);
  }

  saveFilters(filter: CombinedPostListParams) {
    localStorage.setItem('altPost', JSON.stringify(filter));
  }

  getFilter(): CombinedPostListParams | null {
    const data = localStorage.getItem('altPost');
    return data ? JSON.parse(data) : null;
  }
}
