import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-skeleton',
  imports: [],
  templateUrl: './card-skeleton.component.html',
  styleUrl: './card-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSkeletonComponent {
}
