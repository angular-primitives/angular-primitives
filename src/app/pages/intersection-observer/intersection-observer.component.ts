import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DestroyRef,
  ElementRef,
  inject,
  InjectionToken,
  Injector,
  signal,
  Signal,
  ViewChild,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ViewportObserverDirective } from './virtual-observer.directive';
import {
  fromViewportObserver,
  fromVisibilityObserver,
} from '../../../../projects/intersection-observer/public-api';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  standalone: true,
  template: `
    <article>
      <h3 class="contrast">Angular Primitives - Intersection Observer</h3>

      <div class="header">
        <h5>Contextual example</h5>
        <span *ngIf="isRedCicleContextualVisible"
          >&nbsp; (red:
          {{ isRedCicleContextualVisible() ? 'visible' : 'not visible' }};
          &nbsp;
        </span>
        <span *ngIf="isBlueCircleContextualVisible">
          blue:
          {{ isBlueCircleContextualVisible() ? 'visible' : 'not visible' }})
        </span>
      </div>
      <div class="contextual-container" #contextualContainer>
        <div #redCicleContextual class="circle red"></div>
        <div #blueCircleContextual class="circle blue contextual"></div>
      </div>

      <div class="header">
        <h5>Screen example</h5>
        <span *ngIf="isRedCicleVisible"
          >&nbsp; (red: {{ isRedCicleVisible() ? 'visible' : 'not visible' }};
          &nbsp;
        </span>
        <span *ngIf="isBlueCircleVisible">
          blue: {{ isBlueCircleVisible() ? 'visible' : 'not visible' }})
        </span>
      </div>
      <div class="screen-container">
        <div #redCicle class="circle red"></div>
        <div #blueCircle class="circle blue"></div>
      </div>

      <br /><br />
      <div>
        <h5>
          Viewport Observer using ViewChildren and Signal items(virtual
          scroller)
        </h5>
        <br />

        <div class="contextual-container">
          <div
            #itemsViewport
            *ngFor="let item of arrayList(); let index = index"
          >
            <div class="item-viewport" *ngIf="signalViewport()[index]">
              {{ item }}
            </div>
            <div class="item-viewport" *ngIf="!signalViewport()[index]">
              placeholder
            </div>
          </div>
        </div>
      </div>
      <div>
        <h5>Viewport Observer using ElementRef and Signal items(virtual scroller)</h5>
        <br />

        <div
          viewportObserver
          [items]="arrayList"
          (viewportSignal)="signalViewportDirective = $event"
          class="contextual-container"
        >
          <div *ngFor="let item of arrayList(); let index = index">
            <div class="item-viewport" *ngIf="signalViewportDirective()[index]">
              {{ item }}
            </div>
            <div
              class="item-viewport"
              *ngIf="!signalViewportDirective()[index]"
            >
              placeholder
            </div>
          </div>
        </div>
      </div>
      <button (click)="filterOdds()">Filter odd</button>
      <div>
        <h5>
          Viewport Observer using ViewChildren and Observable items(virtual
          scroller)
        </h5>
        <br />

        <div class="contextual-container">
          <div
            #itemsViewport$
            *ngFor="let item of arrayList$ | async; let index = index"
          >
            <div class="item-viewport" *ngIf="signalViewport$()[index]">
              {{ item }}
            </div>
            <div class="item-viewport" *ngIf="!signalViewport$()[index]">
              placeholder
            </div>
          </div>
        </div>
      </div>
      <div>
        <h5>Viewport Observer using ElementRef and Observable items(virtual scroller)</h5>
        <br />

        <div
          viewportObserver
          [items]="arrayList$"
          (viewportSignal)="signalViewportDirective$ = $event"
          class="contextual-container"
        >
          <div *ngFor="let item of arrayList$ | async; let index = index">
            <div class="item-viewport" *ngIf="signalViewportDirective$()[index]">
              {{ item }}
            </div>
            <div
              class="item-viewport"
              *ngIf="!signalViewportDirective$()[index]"
            >
              placeholder
            </div>
          </div>
        </div>
      </div>
      <button (click)="filterOdds$()">Filter odd</button>
    </article>
  `,
  styles: [
    `
      :host {
        .header {
          display: flex;
        }

        .contextual-container {
          display: flex;
          flex-direction: row;
          width: 300px;
          overflow: auto;
          position: relative;
          margin-bottom: 36px;
        }

        .screen-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 700px;
        }

        .circle {
          height: 50px;
          width: 50px;
          border-radius: 50%;

          &.red {
            background: red;
          }

          &.blue {
            background: blue;
          }

          &.contextual {
            position: absolute;
            right: -150px;
          }
        }

        .item-viewport {
          height: 100px;
          width: 100px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, AsyncPipe, ViewportObserverDirective],
})
export class IntersectionObserverComponent implements AfterViewInit {
  @ViewChild('redCicle') redCicle!: ElementRef;
  @ViewChild('blueCircle') blueCircle!: ElementRef;
  @ViewChild('redCicleContextual') redCicleContextual!: ElementRef;
  @ViewChild('blueCircleContextual') blueCircleContextual!: ElementRef;
  @ViewChild('contextualContainer') contextualContainer!: ElementRef;
  @ViewChildren('itemsViewport') itemsViewport!: any;
  @ViewChildren('itemsViewport$') itemsViewport$!: any;

  private _cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef)

  isRedCicleVisible!: Signal<boolean>;
  isBlueCircleVisible!: Signal<boolean>;
  isRedCicleContextualVisible!: Signal<boolean>;
  isBlueCircleContextualVisible!: Signal<boolean>;

  arrayList: WritableSignal<number[]> = signal([...Array(100).keys()]);
  arrayList$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([
    ...Array(100).keys(),
  ]);
  signalViewport: WritableSignal<{ [n: number]: boolean }> = signal({});
  signalViewport$: WritableSignal<{ [n: number]: boolean }> = signal({});
  signalViewportDirective: WritableSignal<{ [n: number]: boolean }> = signal(
    {}
  );
  signalViewportDirective$: WritableSignal<{ [n: number]: boolean }> = signal(
    {}
  );

  ngAfterViewInit() {
    this.isRedCicleVisible = fromVisibilityObserver(
      this.redCicle?.nativeElement,
      {},
      this.destroyRef
    );
    this.isBlueCircleVisible = fromVisibilityObserver(
      this.blueCircle?.nativeElement,
      {},
      this.destroyRef
    );
    const config = {
      root: this.contextualContainer.nativeElement,
      rootMargin: '0px',
      threshold: 0,
    };
    this.isRedCicleContextualVisible = fromVisibilityObserver(
      this.redCicleContextual?.nativeElement,
      config,
      this.destroyRef
    );
    this.isBlueCircleContextualVisible = fromVisibilityObserver(
      this.blueCircleContextual?.nativeElement,
      config,
      this.destroyRef
    );
    this.signalViewport = fromViewportObserver(
      this.itemsViewport,
      {},
      { items: this.arrayList, injector: this.injector, destroyRef: this.destroyRef  }
    );
    this.signalViewport$ = fromViewportObserver(
      this.itemsViewport$,
      {},
      { items: this.arrayList$, injector: this.injector, destroyRef: this.destroyRef }
    );
    this._cd.markForCheck();
  }

  filterOdds(): void {
    this.arrayList.set(this.arrayList().filter((_) => _ % 2 === 1));
  }

  filterOdds$(): void {
    this.arrayList$.next(this.arrayList$.getValue().filter((_) => _ % 2 === 1));
  }
}
