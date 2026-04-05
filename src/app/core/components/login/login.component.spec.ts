import { ComponentFixture, TestBed } from '@angular/core/testing';
import LoginComponent from '@app/core/components/login/login.component';
import { AuthService } from '@app/shared/services/auth.service';
import { signal } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login'], {
      error: signal(null),
      loading: signal(false),
    });

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should call authService.login with valid form values when onSubmit is called', () => {
    const testUsername = 'testuser';
    const testPassword = 'password123';

    component.loginForm.setValue({
      username: testUsername,
      password: testPassword,
    });

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith(testUsername, testPassword);
    expect(mockAuthService.login).toHaveBeenCalledTimes(1);
  });

  it('should not call authService.login when form is invalid', () => {
    component.onSubmit();
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('should not call authService.login when username is only whitespace', () => {
    component.loginForm.setValue({
      username: '   ',
      password: 'password123',
    });

    component.onSubmit();
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });
});
