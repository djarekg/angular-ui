// eslint-disable-next-line max-len
import { DashboardWidgetSelect } from '@/features/settings/components/dashboard-widget-select/dashboard-widget-select.js';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-settings',
  imports: [DashboardWidgetSelect],
  templateUrl: './dashboard-settings.html',
  styleUrl: './dashboard-settings.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardSettings {}
