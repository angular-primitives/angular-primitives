import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Injector,
  Input,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { fromViewportObserver } from '../../../../projects/intersection-observer/public-api';
import { Observable } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[viewportObserver]',
})
export class ViewportObserverDirective implements AfterViewInit {
  @Input() items!: Signal<any> | Observable<any>;
  @Output() viewportSignal: EventEmitter<any> = new EventEmitter<any>();
  private el = inject(ElementRef);
  private injector = inject(Injector);
  signalViewport: WritableSignal<{ [n: number]: boolean }> = signal({});

  ngAfterViewInit(): void {
    this.signalViewport = fromViewportObserver(
      this.el.nativeElement,
      {},
      { items: this.items, injector: this.injector }
    );
    this.viewportSignal.emit(this.signalViewport);
  }
}
