import { Component, inject, input, OnInit, TemplateRef } from '@angular/core';
import { TimestampServiceToken } from '../../services/deadline';
import { CommonModule } from '@angular/common';
import { Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-deadline-rx',
  templateUrl: './deadline-rx.html',
  host: {
    class: 'deadline-component',
  },
  styleUrls: ['./deadline-rx.scss'],
  imports: [CommonModule],
})
export class DeadlineRxComponent implements OnInit {
  label = input<string>('Seconds left to deadline');
  updateInterval = input<number>();
  initialValue = input<number>();
  timestampService = inject(TimestampServiceToken);
  secondsLeft$!: Observable<number | undefined>;
  template = input<TemplateRef<any> | null>(null);
  timestampResource = this.timestampService.getTimestamprs(this.updateInterval());

  ngOnInit(): void {
    this.secondsLeft$ = this.timestampService
      .getTimestamp(this.updateInterval())
      .pipe(startWith(this.initialValue()));
  }
}
