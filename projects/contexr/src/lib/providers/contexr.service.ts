import {HostListener, Inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ContextState} from '../types/context-state';
import {ContextMenuItem} from '../types/context-menu-item';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';

@Injectable({
  providedIn: 'root'
})
export class ContexrService {

  private contextStateSubject: Subject<ContextState> = new Subject<ContextState>();
  private contextStateObservable: Observable<ContextState> = this.contextStateSubject.asObservable();

  constructor(
    @Inject('context') private context: ContextMenuItem[],
    private hotkeysService: HotkeysService
  ) {
    for (let i = 0; i < context.length; i++) {
      this.hotkeysService.add(new Hotkey(context[i].hotkey, (event: KeyboardEvent): boolean => {
        context[i].action();
        return false;
      }));
    }
  }

  /**
   * Returns the state of the context menu
   * @returns {Observable<ContextState>}
   */
  public getContextState(): Observable<ContextState> {
    return this.contextStateObservable;
  }

  /**
   * Open the context menu
   */
  public open(event: MouseEvent, context: string): void {
    this.contextStateSubject.next({
      open: true,
      context: this.context.filter((x) => {
        return x.context.indexOf(context) !== -1 || x.context.indexOf('all') !== -1;
      }),
      top: event.clientY,
      left: event.clientX
    });
  }

  /**
   * Close the context menu
   */
  public close(): void {
    this.contextStateSubject.next({
      open: false
    });
  }
}
