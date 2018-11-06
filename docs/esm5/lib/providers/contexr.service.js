/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import * as i0 from "@angular/core";
import * as i1 from "angular2-hotkeys/src/hotkeys.service";
var ContexrService = /** @class */ (function () {
    function ContexrService(hotkeysService) {
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
    ContexrService.prototype.reset = /**
     * Reset the current context
     * @return {?}
     */
    function () {
        this.currentContext = [];
    };
    /**
     * Add a context
     * @param {?} context
     * @param {?} args
     * @return {?}
     */
    ContexrService.prototype.addCurrentContext = /**
     * Add a context
     * @param {?} context
     * @param {?} args
     * @return {?}
     */
    function (context, args) {
        this.addItemsInContext(this.context, context, args);
    };
    /**
     * Register a context menu person to show up at some context
     * @param {?} context
     * @return {?}
     */
    ContexrService.prototype.registerContextMenuItem = /**
     * Register a context menu person to show up at some context
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this.context.push(context);
        if ((/** @type {?} */ (context)).hotkey && (/** @type {?} */ (context)).hotkey) {
            this.hotkeysService.add(new Hotkey((/** @type {?} */ (context)).hotkey, function (event) {
                (/** @type {?} */ (context)).action();
                return false;
            }));
        }
    };
    /**
     * Register an array of context menu items
     * @param {?} context
     * @return {?}
     */
    ContexrService.prototype.registerContextMenuItems = /**
     * Register an array of context menu items
     * @param {?} context
     * @return {?}
     */
    function (context) {
        for (var i = 0; i < context.length; i++) {
            this.registerContextMenuItem(context[i]);
        }
    };
    /**
     * Returns the state of the context menu
     * @return {?}
     */
    ContexrService.prototype.getContextState = /**
     * Returns the state of the context menu
     * @return {?}
     */
    function () {
        return this.contextStateObservable;
    };
    /**
     * Open the context menu
     * @param {?} event
     * @return {?}
     */
    ContexrService.prototype.open = /**
     * Open the context menu
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.addItemsInContext(this.context, 'all', null);
        this.contextStateSubject.next({
            open: true,
            context: this.currentContext,
            top: event.clientY,
            left: event.clientX
        });
    };
    /**
     * Filter all context items with our context string
     * @param {?} items
     * @param {?} context
     * @param {?} args
     * @return {?}
     */
    ContexrService.prototype.addItemsInContext = /**
     * Filter all context items with our context string
     * @param {?} items
     * @param {?} context
     * @param {?} args
     * @return {?}
     */
    function (items, context, args) {
        for (var i = 0; i < items.length; i++) {
            if ((/** @type {?} */ (items[i])).action) {
                /** @type {?} */
                var action = /** @type {?} */ (Object.assign({}, items[i]));
                if (args !== null) {
                    action.args = args;
                }
                if (action.context.indexOf(context) !== -1) {
                    this.currentContext.push(action);
                }
            }
            else if ((/** @type {?} */ (items[i])).children) {
                /** @type {?} */
                var submenu = /** @type {?} */ (Object.assign({}, items[i]));
                this.addItemsInContext((/** @type {?} */ (items[i])).children, context, args);
                if (submenu.children.length > 0) {
                    this.currentContext.push(submenu);
                }
            }
        }
    };
    /**
     * Close the context menu
     * @return {?}
     */
    ContexrService.prototype.close = /**
     * Close the context menu
     * @return {?}
     */
    function () {
        this.contextStateSubject.next({
            open: false
        });
    };
    ContexrService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    ContexrService.ctorParameters = function () { return [
        { type: HotkeysService }
    ]; };
    /** @nocollapse */ ContexrService.ngInjectableDef = i0.defineInjectable({ factory: function ContexrService_Factory() { return new ContexrService(i0.inject(i1.HotkeysService)); }, token: ContexrService, providedIn: "root" });
    return ContexrService;
}());
export { ContexrService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4ci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29udGV4ci8iLCJzb3VyY2VzIjpbImxpYi9wcm92aWRlcnMvY29udGV4ci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7OztJQWV0RCx3QkFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO3VCQU5aLEVBQUU7OEJBQ0ssRUFBRTttQ0FFTSxJQUFJLE9BQU8sRUFBZ0I7c0NBQ3JCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUU7S0FFM0M7Ozs7O0lBS2hELDhCQUFLOzs7OztRQUNWLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDOzs7Ozs7OztJQVFwQiwwQ0FBaUI7Ozs7OztjQUFDLE9BQWUsRUFBRSxJQUFTO1FBQ2pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7OztJQU8vQyxnREFBdUI7Ozs7O2NBQUMsT0FBeUI7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsbUJBQUMsT0FBYyxFQUFDLENBQUMsTUFBTSxJQUFLLG1CQUFDLE9BQWMsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsbUJBQUMsT0FBYyxFQUFDLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBb0I7Z0JBQy9FLG1CQUFDLE9BQWMsRUFBQyxDQUFDLE1BQU0sRUFBRSxD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cG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7Q29udGV4dFN0YXRlfSBmcm9tICcuLi90eXBlcy9jb250ZXh0LXN0YXRlJztcclxuaW1wb3J0IHtDb250ZXh0TWVudUl0ZW19IGZyb20gJy4uL3R5cGVzL2NvbnRleHQtbWVudS1pdGVtJztcclxuaW1wb3J0IHtIb3RrZXksIEhvdGtleXNTZXJ2aWNlfSBmcm9tICdhbmd1bGFyMi1ob3RrZXlzJztcclxuaW1wb3J0IHtDb250ZXh0TWVudUVudHJ5fSBmcm9tICcuLi90eXBlcy9jb250ZXh0LW1lbnUtZW50cnknO1xyXG5pbXBvcnQge1N1Ym1lbnV9IGZyb20gJy4uL3R5cGVzL3N1Ym1lbnUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4clNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIGNvbnRleHQ6IENvbnRleHRNZW51RW50cnlbXSA9IFtdO1xyXG4gIHByaXZhdGUgY3VycmVudENvbnRleHQ6IENvbnRleHRNZW51RW50cnlbXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIGNvbnRleHRTdGF0ZVN1YmplY3Q6IFN1YmplY3Q8Q29udGV4dFN0YXRlPiA9IG5ldyBTdWJqZWN0PENvbnRleHRTdGF0ZT4oKTtcclxuICBwcml2YXRlIGNvbnRleHRTdGF0ZU9ic2VydmFibGU6IE9ic2VydmFibGU8Q29udGV4dFN0YXRlPiA9IHRoaXMuY29udGV4dFN0YXRlU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBob3RrZXlzU2VydmljZTogSG90a2V5c1NlcnZpY2UpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCB0aGUgY3VycmVudCBjb250ZXh0XHJcbiAgICovXHJcbiAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgdGhpcy5jdXJyZW50Q29udGV4dCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgY29udGV4dFxyXG4gICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICogQHBhcmFtIGFyZ3VtZW50c1xyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRDdXJyZW50Q29udGV4dChjb250ZXh0OiBzdHJpbmcsIGFyZ3M6IGFueSkge1xyXG4gICAgdGhpcy5hZGRJdGVtc0luQ29udGV4dCh0aGlzLmNvbnRleHQsIGNvbnRleHQsIGFyZ3MpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYSBjb250ZXh0IG1lbnUgcGVyc29uIHRvIHNob3cgdXAgYXQgc29tZSBjb250ZXh0XHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBwdWJsaWMgcmVnaXN0ZXJDb250ZXh0TWVudUl0ZW0oY29udGV4dDogQ29udGV4dE1lbnVFbnRyeSk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZXh0LnB1c2goY29udGV4dCk7XHJcbiAgICBpZiAoKGNvbnRleHQgYXMgYW55KS5ob3RrZXkgJiYgIChjb250ZXh0IGFzIGFueSkuaG90a2V5KSB7XHJcbiAgICAgIHRoaXMuaG90a2V5c1NlcnZpY2UuYWRkKG5ldyBIb3RrZXkoKGNvbnRleHQgYXMgYW55KS5ob3RrZXksIChldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIChjb250ZXh0IGFzIGFueSkuYWN0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9KSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWdpc3RlciBhbiBhcnJheSBvZiBjb250ZXh0IG1lbnUgaXRlbXNcclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqL1xyXG4gIHB1YmxpYyByZWdpc3RlckNvbnRleHRNZW51SXRlbXMoY29udGV4dDogQ29udGV4dE1lbnVFbnRyeVtdKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5yZWdpc3RlckNvbnRleHRNZW51SXRlbShjb250ZXh0W2ldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHN0YXRlIG9mIHRoZSBjb250ZXh0IG1lbnVcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDb250ZXh0U3RhdGUoKTogT2JzZXJ2YWJsZTxDb250ZXh0U3RhdGU+IHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRleHRTdGF0ZU9ic2VydmFibGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVuIHRoZSBjb250ZXh0IG1lbnVcclxuICAgKi9cclxuICBwdWJsaWMgb3BlbihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5hZGRJdGVtc0luQ29udGV4dCh0aGlzLmNvbnRleHQsICdhbGwnLCBudWxsKTtcclxuICAgIHRoaXMuY29udGV4dFN0YXRlU3ViamVjdC5uZXh0KHtcclxuICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgY29udGV4dDogdGhpcy5jdXJyZW50Q29udGV4dCxcclxuICAgICAgdG9wOiBldmVudC5jbGllbnRZLFxyXG4gICAgICBsZWZ0OiBldmVudC5jbGllbnRYXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciBhbGwgY29udGV4dCBpdGVtcyB3aXRoIG91ciBjb250ZXh0IHN0cmluZ1xyXG4gICAqIEBwYXJhbSBpdGVtc1xyXG4gICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICogQHJldHVybnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEl0ZW1zSW5Db250ZXh0KGl0ZW1zOiBDb250ZXh0TWVudUVudHJ5W10sIGNvbnRleHQ6IHN0cmluZywgYXJnczogYW55KSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICgoaXRlbXNbaV0gYXMgQ29udGV4dE1lbnVJdGVtKS5hY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBhY3Rpb24gPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtc1tpXSkgYXMgQ29udGV4dE1lbnVJdGVtO1xyXG4gICAgICAgIGlmIChhcmdzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBhY3Rpb24uYXJncyA9IGFyZ3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3Rpb24uY29udGV4dC5pbmRleE9mKGNvbnRleHQpICE9PSAtMSkge1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q29udGV4dC5wdXNoKGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKChpdGVtc1tpXSBhcyBTdWJtZW51KS5jaGlsZHJlbikge1xyXG4gICAgICAgIGNvbnN0IHN1Ym1lbnUgPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtc1tpXSkgYXMgU3VibWVudTtcclxuICAgICAgICB0aGlzLmFkZEl0ZW1zSW5Db250ZXh0KFxyXG4gICAgICAgICAgKGl0ZW1zW2ldIGFzIFN1Ym1lbnUpLmNoaWxkcmVuLFxyXG4gICAgICAgICAgY29udGV4dCxcclxuICAgICAgICAgIGFyZ3NcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChzdWJtZW51LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudENvbnRleHQucHVzaChzdWJtZW51KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlIHRoZSBjb250ZXh0IG1lbnVcclxuICAgKi9cclxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbnRleHRTdGF0ZVN1YmplY3QubmV4dCh7XHJcbiAgICAgIG9wZW46IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19