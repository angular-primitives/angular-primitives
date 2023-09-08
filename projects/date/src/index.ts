import {computed, Signal, signal, WritableSignal} from "@angular/core";
import { formatDate} from "@angular/common";

/**
 * Provides a reactive time difference *(in ms)* signal.
 *
 * @param from timestamp `number` | date `string` | `Date` instance;
 * *May be a reactive signal*
 * @param to timestamp `number` | date `string` | `Date` instance;
 * *May be a reactive signal*
 *
 * @example
 * const [target, setTarget] = createSignal(1641408329089)
 * const [diff, { from, to }] = createTimeDifference("2020 1 11", target)
 * diff() // T: number
 * from() // T: Date
 * to() // T: Date
 */
export function fromTimeDifference(
  from: WritableSignal<Date | string | number>,
  to: WritableSignal<Date | string | number>,
  format?: string
): Signal<Date | string> {
  const diff = computed<Date | string>( () => {
    const fromDate: Date = typeof from() === 'object' ? from() : new Date(from()) as any;
    const toDate: Date = typeof to() === 'object' ? to() : new Date(to()) as any;
    const diffValue = toDate.getTime() - fromDate.getTime();
    return format ? formatDate(diffValue, format, 'en-US') : new Date(diffValue)
  });
  return diff;
}
