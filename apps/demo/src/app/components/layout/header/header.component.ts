import { AuthService } from '@/core/auth/auth.service.js';
import { TitleService } from '@/core/services/title.service.js';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly #authService = inject(AuthService);
  readonly #titleService = inject(TitleService);
  protected readonly title = this.#titleService.title;
  readonly toggleSidenav = output();

  protected async onSignout() {
    await this.#authService.signout();
  }
}
