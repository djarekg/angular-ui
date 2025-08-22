import { HeaderComponent } from '@/components/layout/header/header.component.js';
import { SidenavComponent } from '@/components/sidenav/sidenav.component.js';
import { AuthService } from '@/core/auth/auth.service.js';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-protected-layout',
  imports: [
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterOutlet,
    SidenavComponent,
  ],
  templateUrl: './protected-layout.container.html',
  styleUrl: './protected-layout.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProtectedLayoutContainer {
  protected readonly authService = inject(AuthService);
  protected readonly sidenavOpen = signal(false);
  protected isSidenavOpen = false;

  constructor() {
    effect(() => (this.isSidenavOpen = this.sidenavOpen()));
  }
}
