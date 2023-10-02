import {computed, signal, Signal, WritableSignal} from "@angular/core";


/**
 * Reactive timer.
 *
 * @param timeCycle The timer to create:  {@link setInterval}.
 * @param initialValue: delay Number or {@link Accessor} containing a number representing
 * the time between executions of {@link fn} in ms, or false to disable the timer.
 * @param fn Function to be called every {@link delay} use it to clearInterval.
 *
 * @returns Signal<number>
 */
export function fromTimer(
  timeCycle: number = 1000,
  initialValue: number = 0,
  fn?: Function,
  isCountdown = false
): WritableSignal<number> {
  const signalTimer: WritableSignal<number> = signal(initialValue);
  const timer = setInterval(() => {
    signalTimer.update( (value) => {
      isCountdown ? value-- : value++;
      isCountdown && !value && clearInterval(timer);
      return value;
    });
    fn && fn(timer);
  }, timeCycle);
  return signalTimer
}

/**
 * Reactive timer.
 *
 * @param sleepTime The setTimeout to create:  {@link setTimeout}.
 * @param fn Function to be called in the end of {@link sleepTime} use it to setTimeout.
 *
 * @returns Signal<boolean>
 */
export function fromAwaiting(
  sleepTime: number = 1000,
  fn?: Function
): WritableSignal<boolean> {
  const signalSleep: WritableSignal<boolean> = signal(false);
  const timer = setTimeout(() => {
    signalSleep.update( (value) => {
      value = !value;
      value && clearInterval(timer);
      return value;
    });
    fn && fn(timer);
  }, sleepTime);
  return signalSleep
}
