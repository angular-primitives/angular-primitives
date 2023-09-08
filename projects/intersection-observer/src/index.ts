import { signal, Signal } from '@angular/core';


/**
 * Reactive visibility observer, check if element is visible on intersection.
 *
 * @param element: HTMLElement target to observer
 * @param config: IntersectionObserverInit interface from WebAPI to contextual use cases
 *
 * @returns Boolean Signal
 */
export const fromVisibilityObserver = (element: HTMLElement, config: IntersectionObserverInit = {}): Signal<boolean> => {
  const signals: WeakMap<Element, Signal<boolean>> = new WeakMap<Element, Signal<boolean>>();
  const initialSignal = signal(false);

  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (signals.get(entry.target)) {
        // @ts-ignore
        signals.set(entry.target, signals.get(entry.target)?.set(isIntersecting(entry)));
      } else {
        signals.set(entry.target, initialSignal);
        initialSignal.set(isIntersecting(entry));
      }
    });
  }, config);

  intersectionObserver.observe(element);

  return signals.get(element) || initialSignal;
};

function isIntersecting(entry: IntersectionObserverEntry): boolean {
  return entry.isIntersecting || entry.intersectionRatio > 0;
}
