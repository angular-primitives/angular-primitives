<p align="center">
  <img src="https://github.com/angular/angular/blob/main/aio/src/assets/images/logos/angular/angular.png?raw=true" width="120px" height="120px">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png" width="100px" height="100px">
  <img src="https://www.svgrepo.com/download/139/traffic-light.svg" width="95px" height="120px">
</p>


# @angular-primitives/date


A several dates utilities for different types of use cases:



- [`fromDiffBetweenDates`](#fromDiffBetweenDates) - A reactive diff between dates.
- [`fromFormattedDiffBetweenDates`](#fromFormattedDiffBetweenDates) - A reactive formatted diff between dates.


## Installation

```bash
npm install @angular-primitives/date
# or
pnpm add @angular-primitives/date
# or
yarn add @angular-primitives/date
```


## `fromDiffBetweenDates`([example](https://github.com/Fractal-System/angular-primitives/tree/main/projects/date/src/index.ts))
- Reactive diff between dates
```ts
import { fromDiffBetweenDates } from "@angular-primitives/date";

@Component(
  ...
    template: `
        <input type="date" (change)="from.set($event.target.value)">
        <input type="date" (change)="to.set($event.target.value)">
        {{ diff() }}
    `
)
export class SomeComponent {
  from: WritableSignal<string> = signal('2023/01/01');
  to: WritableSignal<string>  = signal('2023/01/31');
  diff: Signal<Date> = fromDiffBetweenDates(this.from, this.to);
}
```

## `fromFormattedDiffBetweenDates`([example](https://github.com/Fractal-System/angular-primitives/tree/main/projects/date/src/index.ts))
- Formatted reactive diff between dates
```ts
import { fromDiffBetweenDates } from "@angular-primitives/date";

@Component(
  ...
    template: `
        <input type="date" (change)="from.set($event.target.value)">
        <input type="date" (change)="from.set($event.target.value)">
        {{ diff() }}
    `
)
export class SomeComponent {
  from: WritableSignal<string> = signal('2023/01/01');
  to: WritableSignal<string>  = signal('2023/01/31');
  diff: Signal<Date> = fromDiffBetweenDates(this.from, this.to);
}
```

- Formatted reactive diff between dates, example what's is my age
```ts
import { fromDiffBetweenDates } from "@angular-primitives/date";

@Component(
  ...
    template: `
        <input type="date" (change)="birthDate.set($event.target.value)">
        {{ diff() }}
    `
)
export class SomeComponent {
  from: WritableSignal<string> = signal('2023/01/01');
  to: WritableSignal<string>  = signal('2023/01/31');
  birthDate: Signal<Date> = fromDiffBetweenDates(this.from, signal(new Date()), [DateIntervalEnum.year]);
}
```
