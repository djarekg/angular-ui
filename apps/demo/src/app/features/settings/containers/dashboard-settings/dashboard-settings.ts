import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-settings',
  imports: [],
  templateUrl: './dashboard-settings.html',
  styleUrl: './dashboard-settings.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardSettings {
  readonly test1 = '';
}
