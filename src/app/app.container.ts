import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@/core/layout/header/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MatButtonModule, MatIconModule, MatSidenavModule, RouterOutlet],
  templateUrl: './app.container.html',
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      .mat-sidenav-container {
        height: 100vh;
      }

      .mat-sidenav,
      .mat-sidenav-content {
        padding: 16px;
      }

      .mat-sidenav-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        overflow: auto;
      }
    `,
  ],
})
export class App {
  protected readonly sidenavOpen = signal(false);
  protected isSidenavOpen = false;

  constructor() {
    effect(() => (this.isSidenavOpen = this.sidenavOpen()));
  }
}
