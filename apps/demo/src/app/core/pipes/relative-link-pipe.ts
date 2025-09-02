import { normalizePath, removeTrailingSlash } from '@/core/utils/index.js';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeLink',
})
export class RelativeLink implements PipeTransform {
  transform(absoluteUrl: string, result: 'relative' | 'pathname' | 'hash' = 'relative'): string {
    const url = new URL(normalizePath(absoluteUrl));

    if (result === 'hash') {
      return url.hash?.substring(1) ?? '';
    }
    if (result === 'pathname') {
      return `${removeTrailingSlash(normalizePath(url.pathname))}`;
    }
    return `${removeTrailingSlash(normalizePath(url.pathname))}${url.hash ?? ''}`;
  }
}
