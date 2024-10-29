// LoginComponent

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showForgotPasswordModal = false;
  forgotPasswordEmail = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login successful');
      localStorage.setItem('userToken', 'user_logged_in');
      this.router.navigate(['/home']);
    }
  }
  openForgotPasswordModal() {
    this.showForgotPasswordModal = true;
  }

  closeForgotPasswordModal() {
    this.showForgotPasswordModal = false;
  }

  onForgotPasswordSubmit() {
    console.log(`Password reset email sent to ${this.forgotPasswordEmail}`);
    alert(`An email has been sent to your email address to reset your password.`);
    this.closeForgotPasswordModal();
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
