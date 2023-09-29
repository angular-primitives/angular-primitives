import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {fromTimer} from "../../../../projects/timer/src";

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
    </article>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent {
  signalTimer: WritableSignal<number> = signal(0);
  initialTime: number = 0;
  init = false;
  stopTimer: VoidFunction = () => {};

  getValue = (e: any): number => e.target.value;

  startTimer(event: any): void {
    this.init = true;
    [this.signalTimer, this.stopTimer] = fromTimer(1000, event.target.value, () => console.log('aqui'))
  }
}
