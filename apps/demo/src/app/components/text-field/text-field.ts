
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  imports: [FormsModule],
  templateUrl: './text-field.html',
  styleUrl: './text-field.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextField),
      multi: true,
    },
  ],
  host: {
    class: 'app-text-field',
  },
})
export class TextField implements ControlValueAccessor {
  readonly name = input<string | null>(null);
  readonly placeholder = input<string | null>(null);
  readonly disabled = model<boolean>(false);
  // readonly hideIcon = input<boolean>(false);
  readonly autofocus = input<boolean>(false);
  readonly resetLabel = input<string | null>(null);

  // Implemented as part of ControlValueAccessor.
  private onChange: (value: string) => void = (_: string) => {};
  private onTouched: () => void = () => {};

  readonly input = viewChild.required<ElementRef<HTMLInputElement>>('inputRef');
  protected readonly value = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      if (this.autofocus()) {
        this.input().nativeElement.focus();
      }
    });
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  writeValue(value: unknown): void {
    this.value.set(typeof value === 'string' ? value : null);
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  setValue(value: string): void {
    if (this.disabled()) {
      return;
    }

    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  clearTextField() {
    this.setValue('');
  }
}
