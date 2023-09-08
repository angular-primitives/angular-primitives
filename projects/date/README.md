<p align="center">
  <img src="https://github.com/angular/angular/blob/main/aio/src/assets/images/logos/angular/angular.png?raw=true" width="120px" height="120px">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png" width="100px" height="100px">
  <img src="https://www.svgrepo.com/download/139/traffic-light.svg" width="95px" height="120px">
</p>


# @angular-primitives/date


A several dates utilities for different types of use cases:



- [`fromVisibilityObserver`](#fromVisibilityObserver) - A reactive visibility observer primitive.


## Installation

```bash
npm install @angular-primitives/date
# or
pnpm add @angular-primitives/date
# or
yarn add @angular-primitives/date
```


## `fromVisibilityObserver`([example](https://github.com/Fractal-System/angular-primitives/tree/main/projects/intersection-observer/index.ts))
- Screen Observer
```ts
import { fromVisibilityObserver } from "@angular-primitives/date";

@Component(
  ...
    template: `
        <div #someRef></div>
        <span>visible: {{isSomeRefVisible()}}</span>
    `
)
export class SomeComponent implements AfterViewInit {
  @ViewChild('someRef') someRef!: ElementRef;
  isSomeRefVisible!: Signal<boolean>;

  ngAfterViewInit() {
    this.isSomeRefVisible = fromVisibilityObserver(this.someRef?.nativeElement);
  }
}
```

- Contextual Observer
```ts
import { fromVisibilityObserver } from "@angular-primitives/date";

@Component(
  ...
    template: `
        <div #contextualRef>
            <div #someRef></div>
        </div>
        <span>visible: {{isSomeRefVisible()}}</span>
    `
)
export class SomeComponent implements AfterViewInit {
  @ViewChild('contextualRef') contextualRef!: ElementRef;
  @ViewChild('someRef') someRef!: ElementRef;
  isSomeRefVisible!: Signal<boolean>;

  ngAfterViewInit() {
    const config =  { root: this.contextualRef.nativeElement, rootMargin: '0px', threshold: 0 } 
    this.isSomeRefVisible = fromVisibilityObserver(this.someRef?.nativeElement, config);
  }
}
```
