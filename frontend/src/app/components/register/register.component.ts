import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.username, this.password).subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err => {
        console.error(err);
        alert('Registration failed');
      }
    );
  }
}
