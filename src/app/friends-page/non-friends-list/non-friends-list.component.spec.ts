import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonFriendsListComponent } from './non-friends-list.component';

describe('NonFriendsListComponent', () => {
  let component: NonFriendsListComponent;
  let fixture: ComponentFixture<NonFriendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonFriendsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonFriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
