import { Injectable, signal } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterEvent, Scroll } from '@angular/router';
import { filter, map } from 'rxjs';

// Since router events might not be a RouterEvent (i.e. Scroll),
// we need to look for the RouterEvent.
const getRouterEvent = (event: Event) => {
  if (event instanceof RouterEvent) {
    return event;
  }

  if (event instanceof Scroll) {
    return event.routerEvent;
  }

  return null;
};

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  readonly title = signal<string | undefined>('');

  constructor(router: Router, route: ActivatedRoute) {
    // Drill down through the route tree to find the
    // current route so we can get its title.
    router.events.pipe(
      map(event => getRouterEvent(event)),
      filter(event => event instanceof NavigationEnd),
      map(() => route),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }

        return route;
      }),
      map(route => route.snapshot.title),
    ).subscribe(title => this.title.set(title));
  }
}
