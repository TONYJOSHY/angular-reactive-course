import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PostAlternateService } from './post-alternate.service';

describe('PostAlternateService', () => {
  let service: PostAlternateService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostAlternateService],
    });

    service = TestBed.inject(PostAlternateService);
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

  it('should save and retrieve filters from localStorage', () => {
    const dummyFilters = { _start: 0, _limit: 5, user: '', _search: '' };

    service.saveFilters(dummyFilters);

    const retrievedFilters = service.getFilter();

    expect(retrievedFilters).toEqual(dummyFilters);
  });

  it('should handle error in postWithFilters$', () => {
    spyOn(service, 'getPostList').and.returnValue(throwError('Error'));

    const dummyFilters = { _start: 0, _limit: 5, user: '', _search: '' };

    service.setPostFilter(dummyFilters);

    service.postWithFilters$.subscribe(
      () => fail('should have thrown an error'),
      error => {
        expect(error).toEqual('Error');
      }
    );
  });
});


// import { TestBed } from '@angular/core/testing';

// import { PostAlternateService } from './post-alternate.service';

// describe('PostAlternateService', () => {
//   let service: PostAlternateService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(PostAlternateService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
