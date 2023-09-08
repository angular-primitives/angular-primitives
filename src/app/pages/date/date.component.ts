import {ChangeDetectionStrategy, Component, signal, Signal, WritableSignal} from '@angular/core';
import {DateIntervalEnum, fromDiffBetweenDates, fromFormattedDiffBetweenDates} from "../../../../projects/date/src";

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
        <article>
            <h3 class="contrast">Angular Primitives - Dates</h3>

            <div class="header">
              <h5>Difference between Dates</h5>
              <label for="date">Start Date:
                <input type="date" [defaultValue]="from()" (change)="changeDateFrom($event)">
              </label>
              <label for="date">End Date:
                <input type="date" [defaultValue]="to()" (change)="changeDateTo($event)">
              </label>
              <span><b>Format date:</b> {{diff()}}</span><br>
              <span><b>Formatted:</b> {{diffFormatted()}}</span>
            </div>
            <br>

            <div class="header">
              <h5>Your age</h5>
              <label for="date">Date Birth:
                <input type="date" [defaultValue]="from()" (change)="changeDateBirth($event)">
              </label>
              <span><b>Your exact age:</b> {{yourAge()}}</span>
            </div>
        </article>
    `,
})
export class DateComponent {

  from: WritableSignal<string> = signal('2023/09/01');
  to: WritableSignal<string>  = signal('2023/09/31');
  diff: Signal<Date> = fromDiffBetweenDates(this.from, this.to);
  diffFormatted: Signal<string> = fromFormattedDiffBetweenDates(this.from, this.to, [DateIntervalEnum.hour]);

  today = new Date().toString()
  dateBirth: WritableSignal<string> = signal(this.today);
  yourAge: Signal<string> = fromFormattedDiffBetweenDates(this.dateBirth, signal(this.today));

  changeDateFrom = (e: any): void => this.from.set(e.target.value);
  changeDateTo= (e: any): void => this.to.set(e.target.value);
  changeDateBirth = (e: any): void => this.dateBirth.set(e.target.value);

}
