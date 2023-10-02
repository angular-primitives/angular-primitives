<p align="center">
  <img src="https://github.com/angular/angular/blob/main/aio/src/assets/images/logos/angular/angular.png?raw=true" width="120px" height="120px">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png" width="100px" height="100px">
  <img src="https://www.svgrepo.com/download/139/traffic-light.svg" width="95px" height="120px">
</p>


# @angular-primitives/timer


A several time utilities for different types of use cases:



- [`fromTimer`](#fromTimer) - A reactive timer/countdown based on setInterval.
- [`fromWaiting`](#fromWaiting) - A reactive waiting/debounce based on setTimout.


## Installation

```bash
npm install @angular-primitives/timer
# or
pnpm add @angular-primitives/timer
# or
yarn add @angular-primitives/timer
```


## `fromTimer`([example](https://github.com/angular-primitives/angular-primitives/tree/main/projects/timer/src/index.ts))
- Reactive counter until ten
```ts
import { fromTimer } from "@angular-primitives/timer";

@Component(
  ...
    template: `
        {{ signalTimer() }}
    `
)
export class SomeComponent {
  signalTimer: WritableSignal<number> = fromTimer(1000, 0, (timer: any) => {
    console.log(this.signalTimer())
    this.signalTimer() === 10 && clearInterval(timer);
  })
}
```

## `fromFormattedDiffBetweenDates`([example](https://github.com/angular-primitives/angular-primitives/tree/main/projects/timer/src/index.ts))
- Reactive awaiting until ten
```ts
import { signalAwaiting } from "@angular-primitives/timer";

@Component(
  ...
    template: `
        {{ signalAwaiting() ? 'completed' : 'waiting...' }}
    `
)
export class SomeComponent {
  signalAwaiting: WritableSignal<boolean> = fromAwaiting(10000);
}
```
