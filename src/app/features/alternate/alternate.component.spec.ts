import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, of } from 'rxjs';
import { AlternateComponent } from './alternate.component';
import { PostAlternateService } from './services/post-alternate.service';

describe('AlternateComponent', () => {
  let component: AlternateComponent;
  let fixture: ComponentFixture<AlternateComponent>;
  let postServiceSpy: jasmine.SpyObj<PostAlternateService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PostAlternateService', ['setPostFilter']);
    
    TestBed.configureTestingModule({
      declarations: [AlternateComponent],
      imports: [MatPaginatorModule, BrowserAnimationsModule],
      providers: [
        { provide: PostAlternateService, useValue: spy },
      ],
    });

    fixture = TestBed.createComponent(AlternateComponent);
    component = fixture.componentInstance;
    postServiceSpy = TestBed.inject(PostAlternateService) as jasmine.SpyObj<PostAlternateService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle page change', () => {
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 30 };
    component.pageChange(pageEvent);
    expect(postServiceSpy.setPostFilter).toHaveBeenCalledWith({
      ...component.postListParams,
      _start: pageEvent.pageSize * pageEvent.pageIndex,
      _limit: pageEvent.pageSize,
    });
  });

  it('should handle user change', () => {
    const matSelectChange: MatSelectChange = { value: 'userId' } as MatSelectChange;
    component.changeUser(matSelectChange);
    expect(postServiceSpy.setPostFilter).toHaveBeenCalledWith({
      ...component.postListParams,
      user: matSelectChange.value,
      _start: 0,
    });
  });

  // it('should handle search change', () => {
  //   const event: Event = new Event('input');
  //   spyOnProperty(event, 'target').and.returnValue({ value: 'searchQuery' });
  //   component.changeSearch(event);
  //   expect(postServiceSpy.setPostFilter).toHaveBeenCalledWith({
  //     ...component.postListParams,
  //     _search: 'searchQuery',
  //     _start: 0,
  //   });
  // });
});




// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AlternateComponent } from './alternate.component';

// describe('AlternateComponent', () => {
//   let component: AlternateComponent;
//   let fixture: ComponentFixture<AlternateComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [AlternateComponent]
//     });
//     fixture = TestBed.createComponent(AlternateComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
