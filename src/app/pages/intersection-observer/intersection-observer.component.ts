import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Signal,
  ViewChild,
} from '@angular/core';
import { fromVisibilityObserver } from 'dist/@angular-primitives/intersection-observer';
import {DatePipe, NgIf} from '@angular/common';

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
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, DatePipe],
})
export class IntersectionObserverComponent implements AfterViewInit {
  @ViewChild('redCicle') redCicle!: ElementRef;
  @ViewChild('blueCircle') blueCircle!: ElementRef;
  @ViewChild('redCicleContextual') redCicleContextual!: ElementRef;
  @ViewChild('blueCircleContextual') blueCircleContextual!: ElementRef;
  @ViewChild('contextualContainer') contextualContainer!: ElementRef;

  private _cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  isRedCicleVisible!: Signal<boolean>;
  isBlueCircleVisible!: Signal<boolean>;
  isRedCicleContextualVisible!: Signal<boolean>;
  isBlueCircleContextualVisible!: Signal<boolean>;

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
    this._cd.markForCheck();
  }
}
