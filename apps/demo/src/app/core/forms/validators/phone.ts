import { isEmpty } from '@/core/utils/object.js';
import { customError, FieldPath, PathKind, validate } from '@angular/forms/signals';

/**
 * A regular expression that matches valid national phone number
 * in this format `(123) 456-7890`.
 */
const PHONE_REGEXP = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

/**
 * Binds a validator to the given path that requires the value to match a phone format.
 * This function can only be called on string paths.
 *
 * @param path Path of the field to validate
 * @template TPathKind The kind of path the logic is bound to (a root path, child path, or item of an array)
 */
export function phone<TPathKind extends PathKind = PathKind.Root>(
  path: FieldPath<string, TPathKind>,
) {
  validate(path, ctx => {
    if (isEmpty(ctx.value())) {
      return undefined;
    }
    if (!PHONE_REGEXP.test(ctx.value())) {
      return customError({ kind: 'phone', message: 'Invalid phone number format' });
    }

    return undefined;
  });
}
