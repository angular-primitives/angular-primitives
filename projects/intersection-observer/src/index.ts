import {ElementRef, signal, Signal, WritableSignal} from '@angular/core';


/**
 * Reactive visibility observer, check if element is visible on intersection.
 *
 * @param element: HTMLElement target to observer
 * @param config: IntersectionObserverInit interface from WebAPI to contextual use cases
 *
 * @returns Boolean Signal
 */
export const fromVisibilityObserver = (
  element: HTMLElement,
  config:IntersectionObserverInit = {}
): Signal<boolean> => {
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


/**
 * Reactive viewport observer, check if some elements is visible on intersection.
 *
 * @param element: ElementRef[] & HTMLElement[] targets to observer
 * @param config: IntersectionObserverInit interface from WebAPI to contextual use cases
 *
 * @returns WritableSignal<{[n: number]: boolean}>
 */
export const fromViewportObserver = (
  elements: ElementRef[] & HTMLElement[] = [],
  config: IntersectionObserverInit = {}
): WritableSignal<{[n: number]: boolean}> => {
  const viewportSignal: WritableSignal<{[n: number]: boolean}> = signal({});
  const indexElement: WeakMap<Element, number> = new WeakMap<Element, number>();

  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const index = indexElement.get(entry.target) || 0;
      viewportSignal.update( (value) => {
        value[index] = isIntersecting(entry);
        return value;
      })
    });
  }, config);

  for (let i = 0; i < elements?.length; i ++) {
    indexElement.set(elements[i]?.nativeElement || elements[i], i)
    intersectionObserver.observe(elements[i]?.nativeElement || elements[i]);
  }

  return viewportSignal;
};

function isIntersecting(entry: IntersectionObserverEntry): boolean {
  return entry.isIntersecting || entry.intersectionRatio > 0;
}
