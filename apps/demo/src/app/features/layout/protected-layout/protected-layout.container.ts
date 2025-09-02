import { CommandPalette } from '@/components/command-palette/command-palette.component.js';
import { HeaderComponent } from '@/components/layout/header/header.component.js';
import { ESCAPE, SEARCH_TRIGGER_KEY } from '@/core/constants/keys.js';
import { injectIsBrowser } from '@/core/utils/is-browser.js';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationSkipped, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-protected-layout',
  imports: [
    CommandPalette,
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterOutlet,
    // SidenavComponent,
  ],
  templateUrl: './protected-layout.container.html',
  styleUrl: './protected-layout.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:keydown)': 'setSearchDialogVisibilityOnKeyPress($event)',
  },
})
export default class ProtectedLayoutContainer {
  // protected readonly sidenavOpen = signal(false);
  // protected isSidenavOpen = false;
  readonly #router = inject(Router);

  protected readonly isBrowser = injectIsBrowser();

  protected readonly displaySearchDialog = signal(false);

  constructor() {
    this.#closeSearchDialogOnNavigationSkipped();

    // effect(() => (this.isSidenavOpen = this.sidenavOpen()));
  }

  protected setSearchDialogVisibilityOnKeyPress(event: KeyboardEvent): void {
    if (event.key === SEARCH_TRIGGER_KEY && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      this.displaySearchDialog.update(display => !display);
    }

    if (event.key === ESCAPE && this.displaySearchDialog()) {
      event.preventDefault();
      this.displaySearchDialog.set(false);
    }
  }

  #closeSearchDialogOnNavigationSkipped(): void {
    this.#router.events.pipe(filter(event => event instanceof NavigationSkipped)).subscribe(() => {
      this.displaySearchDialog.set(false);
    });
  }
}
