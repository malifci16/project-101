import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth-service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatExpansionPanelActionRow} from "@angular/material/expansion";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatExpansionPanelActionRow,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatError,
    NgIf,
    MatFormField,
    MatInput,
    MatIconButton,
    MatDivider
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public isLoginMode: boolean = true;

  protected loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  protected signUpForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  public constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('jwtToken') !== null) {
      this.router.navigate(['/dashboard']);
    }
  }

  public doLogin(): void {
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      const userName = this.loginForm.get('userName')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(userName, password);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  public changeMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public doSignUp(): void {
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value);
      const userName = this.signUpForm.get('userName')?.value;
      const password = this.signUpForm.get('password')?.value;
      const name = this.signUpForm.get('name')?.value;
      const email = this.signUpForm.get('email')?.value;
      this.authService.signUp(email, name, userName, password);
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }


}
