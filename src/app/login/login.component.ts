import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzColDirective,
    NzFormDirective,
    NzInputDirective,
    ReactiveFormsModule,
    NzInputGroupComponent,
    NzRowDirective,
    NzCheckboxComponent,
    NzButtonComponent
  ],
  styleUrls: ['./login.component.css'] // veya scss/less
})
export class LoginComponent implements  OnInit{
  validateForm!: FormGroup;
  loginForm: FormGroup;
  loginError = false;
  userInfoArray: any[] = [];


  constructor(private fb: FormBuilder, private router:Router, private userService:UserService) {
    this.createForm();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  private createForm(): void {
    this.validateForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      remember: this.fb.control(true)
    });
  }

  getUserInfo(): void {
    const savedUserInfo = sessionStorage.getItem('userInfo');
    console.log(savedUserInfo)
    if (savedUserInfo) {
      this.userInfoArray = JSON.parse(savedUserInfo);
    }
  }


  submitLogin(): void {
    const userData = {
      username: this.validateForm.value.username,
      password: this.validateForm.value.password
    };
    if (!userData.username || !userData.password) {
      return;
    }
    const savedUserInfo = JSON.parse(sessionStorage.getItem('userInfo') || '[]');
    if (savedUserInfo) {
      const isUserValid = savedUserInfo.some((user: { username: string; password: string }) => {
        console.log('Checking user:', user.username, 'with entered username:', userData.username);
        console.log('Checking password:', user.password, 'with entered password:', userData.password);

        return user.username === userData.username && user.password === userData.password;
      });
      if (isUserValid) {
        this.router.navigate(['/offer']);
      } else {
      }
    } else {
      console.error('Saved user info is not a valid array');
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
