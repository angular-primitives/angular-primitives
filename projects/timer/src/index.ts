import {computed, signal, Signal, WritableSignal} from "@angular/core";


/**
 * Reactive timer.
 *
 * @param timeCycle The timer to create:  {@link setInterval}.
 * @param initialValue: delay Number or {@link Accessor} containing a number representing
 * the time between executions of {@link fn} in ms, or false to disable the timer.
 * @param fn Function to be called every {@link delay}.
 *
 * @returns Signal<number>
 */
export function fromTimer(
  timeCycle: number = 1000,
  initialValue: number = 0,
  fn?: VoidFunction,
): [WritableSignal<number>, VoidFunction ] {
  const signalTimer: WritableSignal<number> = signal(initialValue);
  const timer = setInterval(() => {
    signalTimer.update( (_) => _ + 1);
    fn && fn();
  }, timeCycle)
  return [signalTimer, () => clearInterval(timer)]
}
