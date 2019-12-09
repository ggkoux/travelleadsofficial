import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchblogComponent } from './searchblog.component';

describe('SearchblogComponent', () => {
  let component: SearchblogComponent;
  let fixture: ComponentFixture<SearchblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
