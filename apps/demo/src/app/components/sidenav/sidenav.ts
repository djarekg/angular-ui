import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidenav {}
