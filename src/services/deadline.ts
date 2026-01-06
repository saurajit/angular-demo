import { HttpClient } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
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
}
