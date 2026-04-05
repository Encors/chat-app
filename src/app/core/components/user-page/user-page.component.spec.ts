import { ComponentFixture, TestBed } from '@angular/core/testing';
import UserPageComponent from '@app/core/components/user-page/user-page.component';
import { provideRouter } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { signal } from '@angular/core';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['logout'], {
      user: signal(null),
    });

    await TestBed.configureTestingModule({
      imports: [UserPageComponent],
      providers: [provideRouter([]), { provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.logout when logout is called', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockAuthService.logout).toHaveBeenCalledTimes(1);
  });
});
