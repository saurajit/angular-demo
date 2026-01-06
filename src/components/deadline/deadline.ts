import { Component, inject, input, OnInit, TemplateRef } from '@angular/core';
import { TimestampServiceToken } from '../../services/deadline';
import { CommonModule } from '@angular/common';
import { Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-deadline',
  templateUrl: './deadline.html',
  host: {
    class: 'deadline-component',
  },
  styleUrls: ['./deadline.scss'],
  imports: [CommonModule],
})
export class DeadlineComponent implements OnInit {
  label = input<string>('Seconds left to deadline');
  updateInterval = input<number>();
  initialValue = input<number>();
  timestampService = inject(TimestampServiceToken);
  secondsLeft$!: Observable<number | undefined>;
  template = input<TemplateRef<any> | null>(null);

  ngOnInit(): void {
    this.secondsLeft$ = this.timestampService
      .getTimestamp(this.updateInterval())
      .pipe(startWith(this.initialValue()));
  }
}
