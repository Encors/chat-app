import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { UserService } from '@app/shared/services/user.service';
import { SafeUser } from '@app/core/models/user';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['logout']);
    mockUserService = jasmine.createSpyObj('UserService', ['getCurrentUser']);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('currentUserId', '1');

    const mockUser: SafeUser = {
      id: '1',
      username: 'Test User',
      is_online: true,
    };
    mockUserService.getCurrentUser.and.returnValue(mockUser);

    await fixture.whenStable();
  });

  it('should call authService.logout when onLogout is called', () => {
    component.onLogout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockAuthService.logout).toHaveBeenCalledTimes(1);
  });
});
