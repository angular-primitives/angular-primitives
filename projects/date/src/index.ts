import {computed, Signal, WritableSignal} from "@angular/core";


/**
 * Reactive Date difference between two dates/times.
 *
 * @param from: Date initial <Date | string | number> Signal
 * @param to: Date end <Date | string | number> Signal
 *
 * @returns Signal<Date>
 */
export function fromDiffBetweenDates(
  from: WritableSignal<Date | string | number>,
  to: WritableSignal<Date | string | number>
): Signal<Date> {
  const diff = computed<Date>( () => {
    return new Date(getDiffBetweenDates(from(), to()));
  });
  return diff;
}

/**
 * Reactive formatted string difference between two dates/times.
 *
 * @param from: Date initial <Date | string | number> Signal
 * @param to: Date end <Date | string | number> Signal
 * @param useIntervals: DateIntervalEnum[] format
 *
 * @returns Signal<string>
 */
export function fromFormattedDiffBetweenDates(
  from: WritableSignal<Date | string | number>,
  to: WritableSignal<Date | string | number>,
  useIntervals?: DateIntervalEnum[]
): Signal<string> {
  const diff = computed<string>( () => {
    return getFormattedDate(getDiffBetweenDates(from(), to()), useIntervals);
  });
  return diff;
}

function getFormattedDate(milliseconds: number, useIntervals?: DateIntervalEnum[]): string {
  let dateFormatted = '';
  let seconds = milliseconds / 1000;
  Object.keys(intervals)
    .filter((interval) => !useIntervals?.length || useIntervals?.includes(interval as DateIntervalEnum))
    .forEach((interval) => {
      const amountByInterval = Math.floor(seconds / intervals[interval]);
      if (amountByInterval > 0) {
        dateFormatted += ` ${amountByInterval} ${interval}`;
        seconds -= amountByInterval * intervals[interval];
      }
  });
  return dateFormatted;
}

function getDiffBetweenDates(from: Date | string | number, to: Date | string | number): number {
  const fromDate: Date = typeof from === 'object' ? from : new Date(from) as any;
  const toDate: Date = typeof to === 'object' ? to : new Date(to) as any;
  return toDate.getTime() - fromDate.getTime();
}


export enum DateIntervalEnum  {
  year = 'year',
  month = 'month',
  week ='week',
  day = 'day',
  hour = 'hour',
  minute = 'minute',
  second = 'second'
}

export const intervals: { [s: string]: number } = {
  [DateIntervalEnum.year]: 31536000,
  [DateIntervalEnum.month]: 2592000,
  [DateIntervalEnum.week]: 604800,
  [DateIntervalEnum.day]: 86400,
  [DateIntervalEnum.hour]: 3600,
  [DateIntervalEnum.minute]: 60,
  [DateIntervalEnum.second]: 1
};
