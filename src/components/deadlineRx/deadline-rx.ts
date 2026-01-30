import { Component, inject, input } from '@angular/core';
import { TimestampRxServiceToken } from '../../services/deadline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deadline-rx',
  templateUrl: './deadline-rx.html',
  host: {
    class: 'deadline-component',
  },
  styleUrls: ['./deadline-rx.scss'],
  imports: [CommonModule],
})
export class DeadlineRxComponent {
  label = input<string>('Seconds left to deadline');
  updateInterval = input<number>();
  timestampRxService = inject(TimestampRxServiceToken);
  timestampResource = this.timestampRxService.getTimestamprs(this.updateInterval());
}
