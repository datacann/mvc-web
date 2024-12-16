import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NzButtonComponent,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder,private router:Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }



  passwordMatchValidator(form: FormGroup): void {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }
  submitForm(): void {
    this.stateSaved()
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      let existingData = JSON.parse(sessionStorage.getItem('userInfo') || '[]');
      if (!Array.isArray(existingData)) {
        existingData = [];
      }
      existingData.push(userData);
      sessionStorage.setItem('userInfo', JSON.stringify(existingData));
      this.router.navigate(['/login']);
    } else {
      Object.values(this.registerForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }

  stateSaved(): void {
    this.registerForm.valueChanges.subscribe(value => {
      let existingData = JSON.parse(sessionStorage.getItem('userInfo') || '[]');
      if (!Array.isArray(existingData)) {
        existingData = [];
      }
      existingData.push(value);
      sessionStorage.setItem('userInfo', JSON.stringify(existingData));
    });
  }

}
