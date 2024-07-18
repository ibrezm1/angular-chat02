import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private sanitizer: DomSanitizer) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        const encodedData = btoa(`${this.username}:${this.password}`);
        localStorage.setItem('authData', encodedData);
        this.router.navigate(['/chat']);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
