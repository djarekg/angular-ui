import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@/core/layout/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from '@/core/sidenav/sidenav.component.js';

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
  templateUrl: './app.container.html',
  styleUrl: './app.container.css',
})
export class App {
  protected readonly sidenavOpen = signal(false);
  protected isSidenavOpen = false;

  constructor() {
    effect(() => (this.isSidenavOpen = this.sidenavOpen()));
  }
}
