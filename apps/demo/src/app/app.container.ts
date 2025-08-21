import { AuthService } from '@/core/auth/auth.service.js';
import { HeaderComponent } from '@/core/layout/header/header.component';
import { SidenavComponent } from '@/core/sidenav/sidenav.component.js';
import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterOutlet,
    SidenavComponent,
  ],
  styleUrls: ['./app.container.css'],
  templateUrl: './app.container.html',
})
export class App implements OnInit {
  protected readonly authService = inject(AuthService);
  protected readonly sidenavOpen = signal(false);
  protected isSidenavOpen = false;

  constructor() {
    effect(() => (this.isSidenavOpen = this.sidenavOpen()));
  }

  ngOnInit() {
    this.authService.refresh();
  }
}
