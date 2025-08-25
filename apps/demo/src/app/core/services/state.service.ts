import { ApiService } from '@/core/api/api.service.js';
import { inject, Injectable } from '@angular/core';
import { State } from '@aui/api';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly #api = inject(ApiService);

  getStates = () => this.#api.get<State[]>('/states');
}
