import { AuthService } from '@/core/auth/auth.service.js';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App implements OnInit {
  protected readonly authService = inject(AuthService);

  async ngOnInit() {
    await this.authService.refresh();
  }
}
