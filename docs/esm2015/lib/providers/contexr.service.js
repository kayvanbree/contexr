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
            top: event.clientY,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4ci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29udGV4ci8iLCJzb3VyY2VzIjpbImxpYi9wcm92aWRlcnMvY29udGV4ci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7O0FBT3hELE1BQU07Ozs7SUFRSixZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7dUJBTlosRUFBRTs4QkFDSyxFQUFFO21DQUVNLElBQUksT0FBTyxFQUFnQjtzQ0FDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRTtLQUUzQzs7Ozs7SUFLaEQsS0FBSztRQUNWLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDOzs7Ozs7OztJQVFwQixpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsSUFBUztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7SUFPL0MsdUJBQXVCLENBQUMsT0FBeUI7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsbUJBQUMsT0FBYyxFQUFDLENBQUMsTUFBTSxJQUFLLG1CQUFDLE9BQWMsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsbUJBQUMsT0FBYyxFQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBb0IsRUFBVyxFQUFFO2dCQUM1RixtQkFBQyxPQUFjLEVBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNkLENBQUMsQ0FBQyxDQUFDO1NBQ0w7Ozs7Ozs7SUFPSSx3QkFBd0IsQ0FBQyxPQUEyQjtRQUN6RCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUM7Ozs7OztJQU9JLGVBQWU7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQzs7Ozs7OztJQU05QixJQUFJLENBQUMsS0FBaUI7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7WUFDNUIsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDNUIsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ2xCLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTztTQUNwQixDQUFDLENBQUM7Ozs7Ozs7OztJQVNHLGlCQUFpQixDQUFDLEtBQXlCLEVBQUUsT0FBZSxFQUFFLElBQVM7UUFDN0UsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsbUJBQUMsS0FBSyxDQUFDLENBQUMsQ0FBb0IsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O2dCQUN6QyxNQUFNLE1BQU0scUJBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFvQixFQUFDO2dCQUM5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQ3BCO2dCQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2xDO2FBQ0Y7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsbUJBQUMsS0FBSyxDQUFDLENBQUMsQ0FBWSxFQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Z0JBQzFDLE1BQU0sT0FBTyxxQkFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQVksRUFBQztnQkFDdkQsSUFBSSxDQUFDLGlCQUFpQixDQUNwQixtQkFBQyxLQUFLLENBQUMsQ0FBQyxDQUFZLEVBQUMsQ0FBQyxRQUFRLEVBQzlCLE9BQU8sRUFDUCxJQUFJLENBQ0wsQ0FBQztnQkFDRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbkM7YUFDRjtTQUNGOzs7Ozs7SUFNSSxLQUFLO1FBQ1YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQztZQUM1QixJQUFJLEVBQUUsS0FBSztTQUNaLENBQUMsQ0FBQzs7OztZQTlHTixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFOZSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtDb250ZXh0U3RhdGV9IGZyb20gJy4uL3R5cGVzL2NvbnRleHQtc3RhdGUnO1xyXG5pbXBvcnQge0NvbnRleHRNZW51SXRlbX0gZnJvbSAnLi4vdHlwZXMvY29udGV4dC1tZW51LWl0ZW0nO1xyXG5pbXBvcnQge0hvdGtleSwgSG90a2V5c1NlcnZpY2V9IGZyb20gJ2FuZ3VsYXIyLWhvdGtleXMnO1xyXG5pbXBvcnQge0NvbnRleHRNZW51RW50cnl9IGZyb20gJy4uL3R5cGVzL2NvbnRleHQtbWVudS1lbnRyeSc7XHJcbmltcG9ydCB7U3VibWVudX0gZnJvbSAnLi4vdHlwZXMvc3VibWVudSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXhyU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgY29udGV4dDogQ29udGV4dE1lbnVFbnRyeVtdID0gW107XHJcbiAgcHJpdmF0ZSBjdXJyZW50Q29udGV4dDogQ29udGV4dE1lbnVFbnRyeVtdID0gW107XHJcblxyXG4gIHByaXZhdGUgY29udGV4dFN0YXRlU3ViamVjdDogU3ViamVjdDxDb250ZXh0U3RhdGU+ID0gbmV3IFN1YmplY3Q8Q29udGV4dFN0YXRlPigpO1xyXG4gIHByaXZhdGUgY29udGV4dFN0YXRlT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxDb250ZXh0U3RhdGU+ID0gdGhpcy5jb250ZXh0U3RhdGVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhvdGtleXNTZXJ2aWNlOiBIb3RrZXlzU2VydmljZSkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0IHRoZSBjdXJyZW50IGNvbnRleHRcclxuICAgKi9cclxuICBwdWJsaWMgcmVzZXQoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRDb250ZXh0ID0gW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBjb250ZXh0XHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKiBAcGFyYW0gYXJndW1lbnRzXHJcbiAgICovXHJcbiAgcHVibGljIGFkZEN1cnJlbnRDb250ZXh0KGNvbnRleHQ6IHN0cmluZywgYXJnczogYW55KSB7XHJcbiAgICB0aGlzLmFkZEl0ZW1zSW5Db250ZXh0KHRoaXMuY29udGV4dCwgY29udGV4dCwgYXJncyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWdpc3RlciBhIGNvbnRleHQgbWVudSBwZXJzb24gdG8gc2hvdyB1cCBhdCBzb21lIGNvbnRleHRcclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqL1xyXG4gIHB1YmxpYyByZWdpc3RlckNvbnRleHRNZW51SXRlbShjb250ZXh0OiBDb250ZXh0TWVudUVudHJ5KTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbnRleHQucHVzaChjb250ZXh0KTtcclxuICAgIGlmICgoY29udGV4dCBhcyBhbnkpLmhvdGtleSAmJiAgKGNvbnRleHQgYXMgYW55KS5ob3RrZXkpIHtcclxuICAgICAgdGhpcy5ob3RrZXlzU2VydmljZS5hZGQobmV3IEhvdGtleSgoY29udGV4dCBhcyBhbnkpLmhvdGtleSwgKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgKGNvbnRleHQgYXMgYW55KS5hY3Rpb24oKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0pKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVyIGFuIGFycmF5IG9mIGNvbnRleHQgbWVudSBpdGVtc1xyXG4gICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICovXHJcbiAgcHVibGljIHJlZ2lzdGVyQ29udGV4dE1lbnVJdGVtcyhjb250ZXh0OiBDb250ZXh0TWVudUVudHJ5W10pOiB2b2lkIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGV4dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLnJlZ2lzdGVyQ29udGV4dE1lbnVJdGVtKGNvbnRleHRbaV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgc3RhdGUgb2YgdGhlIGNvbnRleHQgbWVudVxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgcHVibGljIGdldENvbnRleHRTdGF0ZSgpOiBPYnNlcnZhYmxlPENvbnRleHRTdGF0ZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY29udGV4dFN0YXRlT2JzZXJ2YWJsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wZW4gdGhlIGNvbnRleHQgbWVudVxyXG4gICAqL1xyXG4gIHB1YmxpYyBvcGVuKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZEl0ZW1zSW5Db250ZXh0KHRoaXMuY29udGV4dCwgJ2FsbCcsIG51bGwpO1xyXG4gICAgdGhpcy5jb250ZXh0U3RhdGVTdWJqZWN0Lm5leHQoe1xyXG4gICAgICBvcGVuOiB0cnVlLFxyXG4gICAgICBjb250ZXh0OiB0aGlzLmN1cnJlbnRDb250ZXh0LFxyXG4gICAgICB0b3A6IGV2ZW50LmNsaWVudFksXHJcbiAgICAgIGxlZnQ6IGV2ZW50LmNsaWVudFhcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlsdGVyIGFsbCBjb250ZXh0IGl0ZW1zIHdpdGggb3VyIGNvbnRleHQgc3RyaW5nXHJcbiAgICogQHBhcmFtIGl0ZW1zXHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkSXRlbXNJbkNvbnRleHQoaXRlbXM6IENvbnRleHRNZW51RW50cnlbXSwgY29udGV4dDogc3RyaW5nLCBhcmdzOiBhbnkpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKChpdGVtc1tpXSBhcyBDb250ZXh0TWVudUl0ZW0pLmFjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW1zW2ldKSBhcyBDb250ZXh0TWVudUl0ZW07XHJcbiAgICAgICAgaWYgKGFyZ3MgIT09IG51bGwpIHtcclxuICAgICAgICAgIGFjdGlvbi5hcmdzID0gYXJncztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjdGlvbi5jb250ZXh0LmluZGV4T2YoY29udGV4dCkgIT09IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDb250ZXh0LnB1c2goYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoKGl0ZW1zW2ldIGFzIFN1Ym1lbnUpLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgY29uc3Qgc3VibWVudSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW1zW2ldKSBhcyBTdWJtZW51O1xyXG4gICAgICAgIHRoaXMuYWRkSXRlbXNJbkNvbnRleHQoXHJcbiAgICAgICAgICAoaXRlbXNbaV0gYXMgU3VibWVudSkuY2hpbGRyZW4sXHJcbiAgICAgICAgICBjb250ZXh0LFxyXG4gICAgICAgICAgYXJnc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHN1Ym1lbnUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q29udGV4dC5wdXNoKHN1Ym1lbnUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2UgdGhlIGNvbnRleHQgbWVudVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuY29udGV4dFN0YXRlU3ViamVjdC5uZXh0KHtcclxuICAgICAgb3BlbjogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=