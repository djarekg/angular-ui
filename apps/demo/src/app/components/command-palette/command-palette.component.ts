import { Search } from '@/core/services/search.service.js';
import { ChangeDetectionStrategy, Component, HostListener, inject, viewChild } from '@angular/core';

@Component({
  selector: 'app-command-palette',
  imports: [],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPaletteComponent {
  readonly dialog = viewChild.required<HTMLDialogElement>('searchDialog');

  readonly #search = inject(Search);

  readonly #query = this.#search.query;
  readonly #resultsResource = this.#search.resultsResource;

  @HostListener('window:keydown.code.cmd.k', [])
  handleKeyDown() {
  }
}
