import {ChangeDetectionStrategy, Component, signal, Signal, WritableSignal} from '@angular/core';
import {fromTimeDifference} from "../../../../projects/date/src";
import {DatePipe} from "@angular/common";

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
        <article>
            <h3 class="contrast">Angular Primitives - Dates</h3>

            <div class="header">
              <h5>Difference between Dates</h5>
              <!-- From -->
              <label for="date">Date
                <input type="date" id="date" name="date" (change)="changeDateFrom($event)">
              </label>
              <!-- To -->
              <label for="date">Date
                <input type="date" id="date" name="date" (change)="changeDateTo($event)">
              </label>
              {{diff()}}
            </div>


        </article>
    `,
  imports: [DatePipe]
})
export class DateComponent {

  from: WritableSignal<string> = signal('2023/01/01');
  to: WritableSignal<string>  = signal('2023/01/31');
  diff: Signal<Date | string> = fromTimeDifference(this.from, this.to, 'dd');

  changeDateFrom(e: any): void {
    console.log(e.target.value);
    this.from.set(e.target.value);
  }

  changeDateTo(e: any): void {
    console.log(e.target.value);
    this.to.set(e.target.value);
  }
}
