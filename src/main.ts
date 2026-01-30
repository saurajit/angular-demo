import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { DeadlineComponent } from './components/deadline/deadline';
import { CommonModule } from '@angular/common';
import { TimestampService, TimestampServiceToken } from './services/deadline';
import { DeadlineRxComponent } from './components/deadlineRx/deadline-rx';

@Component({
  selector: 'app-root',
  imports: [DeadlineComponent, DeadlineRxComponent, CommonModule],
  providers: [
    {
      provide: TimestampServiceToken, // Provide this in any component that uses app-deadline
      useClass: TimestampService, // Provide a custom implementation
    },
  ],
  template: `
    <div>Deadline is on: <strong>{{deadline | date}}</strong></div>

    <h4>Default implementation</h4>
    <app-deadline></app-deadline>

    <h4>With custom template</h4>
    <app-deadline
      label="Seconds to go"
      [updateInterval]="5000"
      [initialValue]="0"
      [template]="customTemplate"
    ></app-deadline>

    <ng-template #customTemplate let-data>
      <div>
        <span class="content-wrapper">{{data.secondsLeft}}</span>
        <span class="label"> - {{data.label}}</span>
      </div>
    </ng-template>

    <h4>With new rsResource</h4>
    <app-deadline-rx />
  `,
})
export class App {
  deadline = new Date('2026-12-31T00:00:00.000Z');
}

bootstrapApplication(App);
