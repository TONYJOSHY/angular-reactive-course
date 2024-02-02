import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateComponent } from './alternate.component';

describe('AlternateComponent', () => {
  let component: AlternateComponent;
  let fixture: ComponentFixture<AlternateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlternateComponent]
    });
    fixture = TestBed.createComponent(AlternateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
