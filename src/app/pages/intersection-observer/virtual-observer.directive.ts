import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  signal,
  WritableSignal
} from "@angular/core";
import {fromViewportObserver} from "../../../../projects/intersection-observer/public-api";

@Directive({
  standalone: true,
  selector: '[viewportObserver]'
})
export class ViewportObserverDirective implements AfterViewInit {
  @Output() viewportSignal: EventEmitter<any> = new EventEmitter<any>();
  private el = inject(ElementRef);
  signalViewport: WritableSignal<{ [n: number]: boolean }> = signal({});

  ngAfterViewInit(): void {
    this.signalViewport = fromViewportObserver(this.el.nativeElement.children);
    this.viewportSignal.emit(this.signalViewport);
  }
}
