/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import * as i0 from "@angular/core";
import * as i1 from "angular2-hotkeys/src/hotkeys.service";
export class ContexrService {
    /**
     * @param {?} hotkeysService
     */
    constructor(hotkeysService) {
        this.hotkeysService = hotkeysService;
        this.context = [];
        this.currentContext = [];
        this.contextStateSubject = new Subject();
        this.contextStateObservable = this.contextStateSubject.asObservable();
    }
    /**
     * Reset the current context
     * @return {?}
     */
    reset() {
        this.currentContext = [];
    }
    /**
     * Add a context
     * @param {?} context
     * @param {?} args
     * @return {?}
     */
    addCurrentContext(context, args) {
        this.addItemsInContext(this.context, context, args);
    }
    /**
     * Register a context menu person to show up at some context
     * @param {?} context
     * @return {?}
     */
    registerContextMenuItem(context) {
        this.context.push(context);
        if ((/** @type {?} */ (context)).hotkey && (/** @type {?} */ (context)).hotkey) {
            this.hotkeysService.add(new Hotkey((/** @type {?} */ (context)).hotkey, (event) => {
                (/** @type {?} */ (context)).action();
                return false;
            }));
        }
    }
    /**
     * Register an array of context menu items
     * @param {?} context
     * @return {?}
     */
    registerContextMenuItems(context) {
        for (let i = 0; i < context.length; i++) {
            this.registerContextMenuItem(context[i]);
        }
    }
    /**
     * Returns the state of the context menu
     * @return {?}
     */
    getContextState() {
        return this.contextStateObservable;
    }
    /**
     * Open the context menu
     * @param {?} event
     * @return {?}
     */
    open(event) {
        this.addItemsInContext(this.context, 'all', null);
        this.contextStateSubject.next({
            open: true,
            context: this.currentContext,
            top: event.clientY + window.pageYOffset,
            left: event.clientX
        });
    }
    /**
     * Filter all context items with our context string
     * @param {?} items
     * @param {?} context
     * @param {?} args
     * @return {?}
     */
    addItemsInContext(items, context, args) {
        for (let i = 0; i < items.length; i++) {
            if ((/** @type {?} */ (items[i])).action) {
                /** @type {?} */
                const action = /** @type {?} */ (Object.assign({}, items[i]));
                if (args !== null) {
                    action.args = args;
                }
                if (action.context.indexOf(context) !== -1) {
                    this.currentContext.push(action);
                }
            }
            else if ((/** @type {?} */ (items[i])).children) {
                /** @type {?} */
                const submenu = /** @type {?} */ (Object.assign({}, items[i]));
                this.addItemsInContext((/** @type {?} */ (items[i])).children, context, args);
                if (submenu.children.length > 0) {
                    this.currentContext.push(submenu);
                }
            }
        }
    }
    /**
     * Close the context menu
     * @return {?}
     */
    close() {
        this.contextStateSubject.next({
            open: false
        });
    }
}
ContexrService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
ContexrService.ctorParameters = () => [
    { type: HotkeysService }
];
/** @nocollapse */ ContexrService.ngInjectableDef = i0.defineInjectable({ factory: function ContexrService_Factory() { return new ContexrService(i0.inject(i1.HotkeysService)); }, token: ContexrService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ContexrService.prototype.context;
    /** @type {?} */
    ContexrService.prototype.currentContext;
    /** @type {?} */
    ContexrService.prototype.contextStateSubject;
    /** @type {?} */
    ContexrService.prototype.contextStateObservable;
    /** @type {?} */
    ContexrService.prototype.hotkeysService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4ci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29udGV4ci8iLCJzb3VyY2VzIjpbImxpYi9wcm92aWRlcnMvY29udGV4ci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7O0FBT3hELE1BQU07Ozs7SUFRSixZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7dUJBTlosRUFBRTs4QkFDSyxFQUFFO21DQUVNLElBQUksT0FBTyxFQUFnQjtzQ0FDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRTtLQUUzQzs7Ozs7SUFLaEQsS0FBSztRQUNWLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDOzs7Ozs7OztJQVFwQixpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsSUFBUztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7SUFPL0MsdUJBQXVCLENBQUMsT0FBeUI7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsbUJBQUMsT0FBYyxFQUFDLENBQUMsTUFBTSxJQUFLLG1CQUFDLE9BQWMsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsbUJBQUMsT0FBYyxFQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBb0IsRUFBVyxFQUFFO2dCQUM1RixtQkFBQyxPQUFjLEVBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNkLENBQUMsQ0FBQyxDQUFDO1NBQ0w7Ozs7Ozs7SUFPSSx3QkFBd0IsQ0FBQyxPQUEyQjtRQUN6RCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUM7Ozs7OztJQU9JLGVBQWU7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQzs7Ozs7OztJQU05QixJQUFJLENBQUMsS0FBaUI7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7WUFDNUIsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDNUIsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFdBQVc7WUFDdkMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPO1NBQ3BCLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU0csaUJBQWlCLENBQUMsS0FBeUIsRUFBRSxPQUFlLEVBQUUsSUFBUztRQUM3RSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxtQkFBQyxLQUFLLENBQUMsQ0FBQyxDQUFvQixFQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3pDLE1BQU0sTUFBTSxxQkFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQW9CLEVBQUM7Z0JBQzlELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNsQixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDcEI7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDbEM7YUFDRjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxtQkFBQyxLQUFLLENBQUMsQ0FBQyxDQUFZLEVBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztnQkFDMUMsTUFBTSxPQUFPLHFCQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBWSxFQUFDO2dCQUN2RCxJQUFJLENBQUMsaUJBQWlCLENBQ3BCLG1CQUFDLEtBQUssQ0FBQyxDQUFDLENBQVksRUFBQyxDQUFDLFFBQVEsRUFDOUIsT0FBTyxFQUNQLElBQUksQ0FDTCxDQUFDO2dCQUNGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNuQzthQUNGO1NBQ0Y7Ozs7OztJQU1JLEtBQUs7UUFDVixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1lBQzVCLElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQyxDQUFDOzs7O1lBOUdOLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQU5lLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0NvbnRleHRTdGF0ZX0gZnJvbSAnLi4vdHlwZXMvY29udGV4dC1zdGF0ZSc7XHJcbmltcG9ydCB7Q29udGV4dE1lbnVJdGVtfSBmcm9tICcuLi90eXBlcy9jb250ZXh0LW1lbnUtaXRlbSc7XHJcbmltcG9ydCB7SG90a2V5LCBIb3RrZXlzU2VydmljZX0gZnJvbSAnYW5ndWxhcjItaG90a2V5cyc7XHJcbmltcG9ydCB7Q29udGV4dE1lbnVFbnRyeX0gZnJvbSAnLi4vdHlwZXMvY29udGV4dC1tZW51LWVudHJ5JztcclxuaW1wb3J0IHtTdWJtZW51fSBmcm9tICcuLi90eXBlcy9zdWJtZW51JztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHJTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0OiBDb250ZXh0TWVudUVudHJ5W10gPSBbXTtcclxuICBwcml2YXRlIGN1cnJlbnRDb250ZXh0OiBDb250ZXh0TWVudUVudHJ5W10gPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0U3RhdGVTdWJqZWN0OiBTdWJqZWN0PENvbnRleHRTdGF0ZT4gPSBuZXcgU3ViamVjdDxDb250ZXh0U3RhdGU+KCk7XHJcbiAgcHJpdmF0ZSBjb250ZXh0U3RhdGVPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPENvbnRleHRTdGF0ZT4gPSB0aGlzLmNvbnRleHRTdGF0ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG90a2V5c1NlcnZpY2U6IEhvdGtleXNTZXJ2aWNlKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzZXQgdGhlIGN1cnJlbnQgY29udGV4dFxyXG4gICAqL1xyXG4gIHB1YmxpYyByZXNldCgpIHtcclxuICAgIHRoaXMuY3VycmVudENvbnRleHQgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGNvbnRleHRcclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqIEBwYXJhbSBhcmd1bWVudHNcclxuICAgKi9cclxuICBwdWJsaWMgYWRkQ3VycmVudENvbnRleHQoY29udGV4dDogc3RyaW5nLCBhcmdzOiBhbnkpIHtcclxuICAgIHRoaXMuYWRkSXRlbXNJbkNvbnRleHQodGhpcy5jb250ZXh0LCBjb250ZXh0LCBhcmdzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVyIGEgY29udGV4dCBtZW51IHBlcnNvbiB0byBzaG93IHVwIGF0IHNvbWUgY29udGV4dFxyXG4gICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICovXHJcbiAgcHVibGljIHJlZ2lzdGVyQ29udGV4dE1lbnVJdGVtKGNvbnRleHQ6IENvbnRleHRNZW51RW50cnkpOiB2b2lkIHtcclxuICAgIHRoaXMuY29udGV4dC5wdXNoKGNvbnRleHQpO1xyXG4gICAgaWYgKChjb250ZXh0IGFzIGFueSkuaG90a2V5ICYmICAoY29udGV4dCBhcyBhbnkpLmhvdGtleSkge1xyXG4gICAgICB0aGlzLmhvdGtleXNTZXJ2aWNlLmFkZChuZXcgSG90a2V5KChjb250ZXh0IGFzIGFueSkuaG90a2V5LCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuID0+IHtcclxuICAgICAgICAoY29udGV4dCBhcyBhbnkpLmFjdGlvbigpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYW4gYXJyYXkgb2YgY29udGV4dCBtZW51IGl0ZW1zXHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBwdWJsaWMgcmVnaXN0ZXJDb250ZXh0TWVudUl0ZW1zKGNvbnRleHQ6IENvbnRleHRNZW51RW50cnlbXSk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0ZXJDb250ZXh0TWVudUl0ZW0oY29udGV4dFtpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBzdGF0ZSBvZiB0aGUgY29udGV4dCBtZW51XHJcbiAgICogQHJldHVybnNcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q29udGV4dFN0YXRlKCk6IE9ic2VydmFibGU8Q29udGV4dFN0YXRlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0U3RhdGVPYnNlcnZhYmxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbiB0aGUgY29udGV4dCBtZW51XHJcbiAgICovXHJcbiAgcHVibGljIG9wZW4oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkSXRlbXNJbkNvbnRleHQodGhpcy5jb250ZXh0LCAnYWxsJywgbnVsbCk7XHJcbiAgICB0aGlzLmNvbnRleHRTdGF0ZVN1YmplY3QubmV4dCh7XHJcbiAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgIGNvbnRleHQ6IHRoaXMuY3VycmVudENvbnRleHQsXHJcbiAgICAgIHRvcDogZXZlbnQuY2xpZW50WSArIHdpbmRvdy5wYWdlWU9mZnNldCxcclxuICAgICAgbGVmdDogZXZlbnQuY2xpZW50WFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgYWxsIGNvbnRleHQgaXRlbXMgd2l0aCBvdXIgY29udGV4dCBzdHJpbmdcclxuICAgKiBAcGFyYW0gaXRlbXNcclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRJdGVtc0luQ29udGV4dChpdGVtczogQ29udGV4dE1lbnVFbnRyeVtdLCBjb250ZXh0OiBzdHJpbmcsIGFyZ3M6IGFueSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoKGl0ZW1zW2ldIGFzIENvbnRleHRNZW51SXRlbSkuYWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbXNbaV0pIGFzIENvbnRleHRNZW51SXRlbTtcclxuICAgICAgICBpZiAoYXJncyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgYWN0aW9uLmFyZ3MgPSBhcmdzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aW9uLmNvbnRleHQuaW5kZXhPZihjb250ZXh0KSAhPT0gLTEpIHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudENvbnRleHQucHVzaChhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICgoaXRlbXNbaV0gYXMgU3VibWVudSkuY2hpbGRyZW4pIHtcclxuICAgICAgICBjb25zdCBzdWJtZW51ID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbXNbaV0pIGFzIFN1Ym1lbnU7XHJcbiAgICAgICAgdGhpcy5hZGRJdGVtc0luQ29udGV4dChcclxuICAgICAgICAgIChpdGVtc1tpXSBhcyBTdWJtZW51KS5jaGlsZHJlbixcclxuICAgICAgICAgIGNvbnRleHQsXHJcbiAgICAgICAgICBhcmdzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoc3VibWVudS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDb250ZXh0LnB1c2goc3VibWVudSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZSB0aGUgY29udGV4dCBtZW51XHJcbiAgICovXHJcbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZXh0U3RhdGVTdWJqZWN0Lm5leHQoe1xyXG4gICAgICBvcGVuOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==