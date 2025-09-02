import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-skeleton',
  imports: [],
  templateUrl: './card-skeleton.html',
  styleUrl: './card-skeleton.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSkeleton {
}
