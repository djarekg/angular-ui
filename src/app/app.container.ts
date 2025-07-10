import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@/core/layout/header/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MatSidenavModule, RouterOutlet],
  templateUrl: './app.container.html',
  styles: [
    `
      :host {
        display: block;
        height: 100%;
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
export class App {}
