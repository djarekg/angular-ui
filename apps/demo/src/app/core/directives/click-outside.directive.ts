import { Directive, DOCUMENT, ElementRef, inject, Input, output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  host: {
    'document:click': 'onClick($event)',
  },
})
export class ClickOutside {
  // TODO: Understand why replacing this @Input with a signal input breaks the tests
  @Input('appClickOutsideIgnore')
  ignoredElementsIds: string[] = [];

  readonly clickOutside = output<void>({ alias: 'docsClickOutside' });

  readonly #document = inject(DOCUMENT);
  readonly #elementRef = inject(ElementRef<HTMLElement>);

  onClick(event: MouseEvent): void {
    if (
      !this.#elementRef.nativeElement.contains(event.target) &&
      !this.wasClickedOnIgnoredElement(event)
    ) {
      this.clickOutside.emit();
    }
  }

  private wasClickedOnIgnoredElement(event: MouseEvent): boolean {
    if (this.ignoredElementsIds.length === 0) {
      return false;
    }

    return this.ignoredElementsIds.some(elementId => {
      const element = this.#document.getElementById(elementId);
      const target = event.target as Node;
      const contains = element?.contains(target);
      return contains;
    });
  }
}
