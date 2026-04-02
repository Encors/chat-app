import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);

  readonly loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username?.trim();
      const password = this.loginForm.value.password;

      if (username && password) {
        this.authService.login(username, password);
      }
    }
  }
}
