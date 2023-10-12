import {
  DestroyRef,
  effect,
  EffectRef,
  ElementRef,
  Injector,
  isSignal,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import {Observable} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";


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
  config:IntersectionObserverInit = {},
  destroyRef?: DestroyRef
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

  destroyRef && handleDestroyRef(destroyRef, intersectionObserver);

  return signals.get(element) || initialSignal;
};


/**
 * Reactive viewport observer, check if some elements is visible on intersection.
 *
 * @param ref: Reference Object with array of items to observe
 * @param config: IntersectionObserverInit interface from WebAPI to contextual use cases
 * @param context: Object with items(signal or observable) and injector to use effect, use when your list can change
 *
 * @returns WritableSignal<{[n: number]: boolean}>
 */
export const fromViewportObserver = (
  ref: { _results: ElementRef[] } & { children: HTMLElement[] },
  config: IntersectionObserverInit = {},
  context?: { items: Signal<any> | Observable<any>, injector: Injector, destroyRef?: DestroyRef }
): WritableSignal<{[n: number]: boolean}> => {
  const viewportSignal: WritableSignal<{[n: number]: boolean}> = signal({});
  const indexElement: WeakMap<Element, number> = new WeakMap<Element, number>();

  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const index = indexElement.get(entry.target) || 0;
      viewportSignal.update( (value) => {
        value[index] = !index ? true: isIntersecting(entry);
        return value;
      })
    });
  }, config);

  const observeElements = () => {
    for (let i = 0; i < getElementsFromRef(ref)?.length; i ++) {
      const element = getElementsFromRef(ref)[i]?.nativeElement || getElementsFromRef(ref)[i];
      indexElement.set(element, i)
      intersectionObserver.observe(element);
    }
  }

  if (context) {
    const signal = isSignal(context.items) ? context.items : toSignal(context.items as any, { injector: context.injector});
    effect(() => {
      signal();
      setTimeout( () => observeElements());
    }, { injector: context.injector });
  } else {
    observeElements();
  }

  context?.destroyRef && handleDestroyRef(context.destroyRef, intersectionObserver);

  return viewportSignal;
};

function getElementsFromRef(ref: any): ElementRef[] & HTMLElement[] {
  return ref?._results || ref?.children;
}

function isIntersecting(entry: IntersectionObserverEntry): boolean {
  return entry.isIntersecting || entry.intersectionRatio > 0;
}

function handleDestroyRef(destroyRef: DestroyRef, intersectionObserver: IntersectionObserver): void {
  const destroy = destroyRef.onDestroy(() => {
    intersectionObserver.disconnect();
    destroy()
  });
}
