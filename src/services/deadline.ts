import { HttpClient } from '@angular/common/http';
import { inject, InjectionToken, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { interval, map, Observable, of, switchMap, take } from 'rxjs';

type TimestampApiResponseType = {
  secondsLeft: number;
  milliSecondsLeft: number;
  deadline: string;
};

export const TimestampServiceToken =
  new InjectionToken<TimestampAbstractService>('TimestampAbstractService');

export abstract class TimestampAbstractService {
  abstract getTimestamp(intervalInMs?: number): Observable<number>;
  abstract getTimestamprs(intervalInMs?: number): ResourceRef<number| undefined>;
}

export class TimestampService implements TimestampAbstractService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `https://timestamp-fawn.vercel.app/api/deadline`;

  private fetchTimestamp(): Observable<number> {
    return this.http
      .get<TimestampApiResponseType>(this.apiUrl)
      .pipe(map((res) => res.secondsLeft));
  }

  getTimestamp(intervalInMs = 1000): Observable<number> {
    return interval(intervalInMs).pipe(switchMap(() => this.fetchTimestamp()));
  }

  getTimestamprs(intervalInMs = 1000): ResourceRef<number| undefined> {
    return rxResource({
      params: () => ({intervalInMs}),
      stream: ({params}) => this.getTimestamp(params.intervalInMs),
      defaultValue: 0
    })
  }
}

// Example service to override and use different service
export class TimestampService2 implements TimestampAbstractService {
  private dataList = [1, 2, 4];
  getTimestamp(intervalInMs = 1000): Observable<number> {
    return interval(intervalInMs).pipe(
      take(this.dataList.length),
      switchMap((i) => of(this.dataList[i]))
    );
  }

  getTimestamprs(intervalInMs = 1000): ResourceRef<number| undefined> {
    return rxResource({
      params: () => ({intervalInMs}),
      stream: ({params}) => interval(params.intervalInMs).pipe(
        take(this.dataList.length),
        switchMap((i) => of(this.dataList[i]))
      ),
      defaultValue: 0
    })
  }
}
