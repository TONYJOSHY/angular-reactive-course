import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });

    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user list', () => {
    const dummyUsers: any = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];

    service.userList$.subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpTestingController.expectOne(`${service.baseUrl}/users`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyUsers);
  });

  // it('should get post list with filters', () => {
  //   const dummyPosts: any = [{ userId: 1, title: 'Post 1' }, { userId: 2, title: 'Post 2' }];
  //   const dummyUsers: any = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];

  //   spyOn(service, 'getPostList').and.returnValue(of(dummyPosts));
  //   spyOnProperty(service, 'userList$').and.returnValue(of(dummyUsers));

  //   const dummyFilters = { _start: 0, _limit: 5, user: '', _search: '' };
  //   const expectedMappedPosts = dummyPosts.map(post => ({ ...post, userName: 'John' }));

  //   service.setPostFilter(dummyFilters);

  //   service.postWithFilters$.subscribe(posts => {
  //     expect(posts).toEqual(expectedMappedPosts);
  //   });
  // });

  it('should set post filter', () => {
    const dummyParams = { _start: 0, _limit: 5, user: '', _search: '' };

    service.setPostFilter(dummyParams);

    service.postFilterActions$.subscribe(params => {
      expect(params).toEqual(dummyParams);
    });
  });
});


// import { TestBed } from '@angular/core/testing';

// import { PostService } from './post.service';

// describe('PostService', () => {
//   let service: PostService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({ });
//     service = TestBed.inject(PostService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
