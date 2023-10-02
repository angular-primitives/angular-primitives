import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {fromTimer, fromAwaiting} from "../../../../projects/timer/src";
import {NgIf} from "@angular/common";

@Component({
  standalone: true,
  template: `
    <article>
      <h3 class="contrast">Angular Primitives - Timer</h3>

      <div class="header">
        <h5>Simple timer in seconds</h5>
        <label for="date">Start from:
          <input type="number" [value]="initialTime" (change)="initialTime = getValue($event)">
        </label>

        {{init && signalTimer()}}
        <button (click)="startTimer($event)">Start time</button>
        <button (click)="stopTimer()">Stop time</button>
      </div>
      <br>
      <h5>After finish the countdown the button will appears</h5>
      {{signalCountdown()}}
      <button *ngIf="signalWaiting()" (click)="resetCount()">Reset countdown</button>
    </article>
    `,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent {
  signalTimer: WritableSignal<number> = signal(0);
  signalCountdown: WritableSignal<number> = fromTimer(1000, 10,() => {}, true);
  signalWaiting: WritableSignal<boolean> = fromAwaiting(10000);
  initialTime: number = 0;
  init = false;
  stopTimer: VoidFunction = () => {};

  getValue = (e: any): number => e.target.value;

  startTimer(event: any): void {
    this.init = true;
    this.signalTimer = fromTimer(1000, this.initialTime, (timer: any) => {
      console.log(this.signalTimer())
      this.signalTimer() === 10 && clearInterval(timer);
    })
  }

  resetCount(): void {
    this.signalCountdown = fromTimer(1000, 10,() => {}, true);
    this.signalWaiting = fromAwaiting(10000);
  }
}
