import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject, signal,
  Signal,
  ViewChild, ViewChildren, WritableSignal,
} from '@angular/core';
import { fromVisibilityObserver, fromViewportObserver } from 'dist/@angular-primitives/intersection-observer';
import { NgFor, NgIf} from '@angular/common';
import {ViewportObserverDirective} from "./virtual-observer.directive";

@Component({
  standalone: true,
  template: `
    <article>
      <h3 class="contrast">Angular Primitives - Intersection Observer</h3>

      <div class="header">
        <h5>Contextual example</h5>
        <span *ngIf="isRedCicleContextualVisible">&nbsp;
          (red: {{ isRedCicleContextualVisible() ? 'visible' : 'not visible' }}; &nbsp;
        </span>
        <span *ngIf="isBlueCircleContextualVisible">
          blue: {{ isBlueCircleContextualVisible() ? 'visible' : 'not visible' }})
        </span>
      </div>
      <div class="contextual-container" #contextualContainer>
        <div #redCicleContextual class="circle red"></div>
        <div #blueCircleContextual class="circle blue contextual"></div>
      </div>

      <div class="header">
        <h5>Screen example</h5>
        <span *ngIf="isRedCicleVisible">&nbsp;
          (red: {{ isRedCicleVisible() ? 'visible' : 'not visible' }}; &nbsp;
        </span>
        <span *ngIf="isBlueCircleVisible">
          blue: {{ isBlueCircleVisible() ? 'visible' : 'not visible' }})
        </span>
      </div>
      <div class="screen-container">
        <div #redCicle class="circle red"></div>
        <div #blueCircle class="circle blue"></div>
      </div>

      <br><br>
      <div>
        <h5>Viewport Observer using ViewChildren(virtual scroller)</h5><br>

        <div class="contextual-container">
          <div #itemsViewport *ngFor="let item of arrayList; let index = index">
            <div class="item-viewport" *ngIf="signalViewport()[index]">
              {{index}}
            </div>
            <div class="item-viewport" *ngIf="!signalViewport()[index]">
              placeholder
            </div>
          </div>
        </div>
      </div>
      <div>
        <h5>Viewport Observer using ElementRef(virtual scroller)</h5><br>

        <div viewportObserver (viewportSignal)="signalViewportDirective = $event" class="contextual-container">
          <div *ngFor="let item of arrayList; let index = index">
            <div class="item-viewport" *ngIf="signalViewportDirective()[index]">
              {{index}}
            </div>
            <div class="item-viewport" *ngIf="!signalViewportDirective()[index]">
              placeholder
            </div>
          </div>
        </div>
      </div>
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
  imports: [NgIf, NgFor, ViewportObserverDirective],
})
export class IntersectionObserverComponent implements AfterViewInit {
  @ViewChild('redCicle') redCicle!: ElementRef;
  @ViewChild('blueCircle') blueCircle!: ElementRef;
  @ViewChild('redCicleContextual') redCicleContextual!: ElementRef;
  @ViewChild('blueCircleContextual') blueCircleContextual!: ElementRef;
  @ViewChild('contextualContainer') contextualContainer!: ElementRef;
  @ViewChildren('itemsViewport') itemsViewport!: any;

  private _cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  isRedCicleVisible!: Signal<boolean>;
  isBlueCircleVisible!: Signal<boolean>;
  isRedCicleContextualVisible!: Signal<boolean>;
  isBlueCircleContextualVisible!: Signal<boolean>;

  arrayList: number[] = [...Array(100).keys()];
  signalViewport: WritableSignal<{ [n: number]: boolean }> = signal({});
  signalViewportDirective: WritableSignal<{ [n: number]: boolean }> = signal({});

  ngAfterViewInit() {
    this.isRedCicleVisible = fromVisibilityObserver(
      this.redCicle?.nativeElement
    );
    this.isBlueCircleVisible = fromVisibilityObserver(
      this.blueCircle?.nativeElement
    );
    const config = { root: this.contextualContainer.nativeElement, rootMargin: '0px', threshold: 0 }
    this.isRedCicleContextualVisible = fromVisibilityObserver(
      this.redCicleContextual?.nativeElement,
      config
    );
    this.isBlueCircleContextualVisible = fromVisibilityObserver(
      this.blueCircleContextual?.nativeElement,
      config
    );
    this.signalViewport = fromViewportObserver(this.itemsViewport._results)
    this._cd.markForCheck();
  }
}


