import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import IUser from '../../interfaces/user';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const mockUser: IUser = {
    id: 228,
    name: 'Yura',
    username: 'yurkagon',
    email: 'somemail@gmail.com',
    phone: '12345678',
    website: 'kek.com',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.user = mockUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
