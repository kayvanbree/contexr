import { Injectable, Directive, HostListener, Input, Component, ElementRef, NgModule, defineInjectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Hotkey, HotkeysService, HotkeyModule } from 'angular2-hotkeys';
import { HotkeysService as HotkeysService$1 } from 'angular2-hotkeys/src/hotkeys.service';
import { ContexrService } from 'contexr/lib/providers/contexr.service';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ContextMenuEntry {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ContextMenuItem extends ContextMenuEntry {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ContexrService$1 {
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
ContexrService$1.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
ContexrService$1.ctorParameters = () => [
    { type: HotkeysService }
];
/** @nocollapse */ ContexrService$1.ngInjectableDef = defineInjectable({ factory: function ContexrService_Factory() { return new ContexrService$1(inject(HotkeysService$1)); }, token: ContexrService$1, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ContextMenuComponent {
    /**
     * @param {?} contexr
     */
    constructor(contexr) {
        this.contexr = contexr;
        this.open = false;
        // Event capturing (not possible in real Angular yet)
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            console.log('Reset context menu and prevent default');
            this.contexr.reset();
        }, true);
    }
    /**
     * Close the context menu when we click somewhere else
     * @return {?}
     */
    onDocumentClick() {
        this.contexr.close();
    }
    /**
     * Prevent a right click from the context menu to propagate further
     * @param {?} event
     * @return {?}
     */
    onContextMenu(event) {
        event.stopPropagation();
    }
    /**
     * Prevent a click from the context menu to propagate further
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        event.stopPropagation();
    }
    /**
     * Show context menu for our context or for all
     * @param {?} event
     * @return {?}
     */
    onDocumentContextMenu(event) {
        console.log('Open context menu');
        this.contexr.open(event);
    }
    /**
     * Subscribe to the context menu state
     * @return {?}
     */
    ngOnInit() {
        this.contextStateSub = this.contexr.getContextState().subscribe((value) => {
            this.contextState = value;
            this.open = !!this.contextState.context;
        });
    }
    /**
     * Unsub from the context menu state
     * @return {?}
     */
    ngOnDestroy() {
        this.contextStateSub.unsubscribe();
    }
    /**
     * Check if this is an action
     * @param {?} item
     * @return {?}
     */
    isAction(item) {
        return !!(/** @type {?} */ (item)).action;
    }
}
ContextMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ctx-context-menu',
                template: `<div
  (contextmenu)="onContextMenu($event)"
  (click)="onClick($event)"
  *ngIf="open"
  class="context-menu menu"
  [ngStyle]="{'top.px': contextState.top, 'left.px': contextState.left}"
>
  <ul class="context-list">
    <ng-container *ngFor="let item of contextState.context">
      <ctx-context-menu-item *ngIf="isAction(item)" [item]="item"></ctx-context-menu-item>
      <ctx-submenu *ngIf="!isAction(item)" [item]="item"></ctx-submenu>
    </ng-container>
  </ul>
</div>
`,
                styles: [`.context-menu{position:absolute}::ng-deep .menu{background:#fff;border:1px solid #a7a7a7;box-shadow:0 0 10px 0 rgba(0,0,0,.5)}::ng-deep .menu .context-list{margin:0;padding:0}::ng-deep .menu .context-list .context-list-item{list-style:none;padding:5px 7px;min-width:200px;cursor:pointer}::ng-deep .menu .context-list .context-list-item .flex-container{display:flex}::ng-deep .menu .context-list .context-list-item .shortcut{font-size:.8em;opacity:.5;margin-left:10px;margin-top:2px}::ng-deep .menu .context-list .context-list-item .submenu{display:none;position:absolute;margin-top:-20px}::ng-deep .menu .context-list .context-list-item:hover{background:rgba(0,0,0,.1)}::ng-deep .menu .context-list .context-list-item:hover>.submenu{display:block}`]
            },] },
];
/** @nocollapse */
ContextMenuComponent.ctorParameters = () => [
    { type: ContexrService$1 }
];
ContextMenuComponent.propDecorators = {
    onDocumentClick: [{ type: HostListener, args: ['document:click',] }],
    onDocumentContextMenu: [{ type: HostListener, args: ['document:contextmenu', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SubmenuComponent {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        this.subMenuStyle = {};
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        /** @type {?} */
        const rect = this.element.nativeElement.getBoundingClientRect();
        this.subMenuStyle = {
            'left': 214 + 'px',
            'top': rect.offsetHeight + 'px'
        };
    }
    /**
     * Check if this is an action
     * @param {?} item
     * @return {?}
     */
    isAction(item) {
        return !!(/** @type {?} */ (item)).action;
    }
}
SubmenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ctx-submenu',
                template: `<li class="context-list-item">
  <div class="flex-container">
    <span class="context">{{item.text}}</span>
    <span style="flex: 1 1 auto;"></span>
    <span class="shortcut">>>></span>
  </div>
  <ul class="context-list submenu menu" [ngStyle]="subMenuStyle">
    <ng-container *ngFor="let subItem of item.children">
      <ctx-context-menu-item *ngIf="isAction(subItem)" [item]="subItem"></ctx-context-menu-item>
      <ctx-submenu *ngIf="!isAction(subItem)" [item]="subItem"></ctx-submenu>
    </ng-container>
  </ul>
</li>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
SubmenuComponent.ctorParameters = () => [
    { type: ElementRef }
];
SubmenuComponent.propDecorators = {
    item: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ContextMenuItemComponent {
    /**
     * @param {?} contexr
     */
    constructor(contexr) {
        this.contexr = contexr;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * Call an action and close the context menu
     * @return {?}
     */
    act() {
        console.log(this.item);
        this.item.action(this.item.args);
        this.contexr.close();
    }
}
ContextMenuItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ctx-context-menu-item',
                template: `<li (click)="act()" class="context-list-item">
  <div class="flex-container">
    <span class="context">{{item.text}}</span>
    <span style="flex: 1 1 auto;"></span>
    <span class="shortcut">{{item.hotkey}}</span>
  </div>
</li>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
ContextMenuItemComponent.ctorParameters = () => [
    { type: ContexrService$1 }
];
ContextMenuItemComponent.propDecorators = {
    item: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ContextDirective {
    /**
     * @param {?} contexr
     */
    constructor(contexr) {
        this.contexr = contexr;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onContextMenu(event) {
        console.log('Adding context: ' + this.ctx + ' with args: ' + this.ctxArgs);
        this.contexr.addCurrentContext(this.ctx, this.ctxArgs);
    }
}
ContextDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ctx]'
            },] },
];
/** @nocollapse */
ContextDirective.ctorParameters = () => [
    { type: ContexrService }
];
ContextDirective.propDecorators = {
    ctx: [{ type: Input, args: ['ctx',] }],
    ctxArgs: [{ type: Input, args: ['ctxArgs',] }],
    onContextMenu: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ContexrModule {
}
ContexrModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HotkeyModule.forRoot()
                ],
                declarations: [
                    ContextMenuComponent,
                    SubmenuComponent,
                    ContextMenuItemComponent,
                    ContextDirective
                ],
                exports: [
                    ContextMenuComponent,
                    ContextDirective
                ],
                providers: [
                    ContexrService$1
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { ContextMenuItem, ContextMenuComponent, ContexrModule, ContextMenuItemComponent as ɵd, SubmenuComponent as ɵc, ContextDirective as ɵe, ContexrService$1 as ɵb, ContextMenuEntry as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4ci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vY29udGV4ci9saWIvdHlwZXMvY29udGV4dC1tZW51LWVudHJ5LnRzIiwibmc6Ly9jb250ZXhyL2xpYi90eXBlcy9jb250ZXh0LW1lbnUtaXRlbS50cyIsIm5nOi8vY29udGV4ci9saWIvcHJvdmlkZXJzL2NvbnRleHIuc2VydmljZS50cyIsIm5nOi8vY29udGV4ci9saWIvY29tcG9uZW50cy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vY29udGV4ci9saWIvY29tcG9uZW50cy9zdWJtZW51L3N1Ym1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9jb250ZXhyL2xpYi9jb21wb25lbnRzL2NvbnRleHQtbWVudS1pdGVtL2NvbnRleHQtbWVudS1pdGVtLmNvbXBvbmVudC50cyIsIm5nOi8vY29udGV4ci9saWIvZGlyZWN0aXZlcy9jb250ZXh0LmRpcmVjdGl2ZS50cyIsIm5nOi8vY29udGV4ci9saWIvY29udGV4ci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENvbnRleHRNZW51RW50cnkge1xyXG4gIHRleHQ6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQge0NvbnRleHRNZW51RW50cnl9IGZyb20gJy4vY29udGV4dC1tZW51LWVudHJ5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudUl0ZW0gZXh0ZW5kcyBDb250ZXh0TWVudUVudHJ5IHtcclxuICBjb250ZXh0OiBzdHJpbmdbXTtcclxuICBhY3Rpb246IChhcmdzOiBhbnkpID0+IHZvaWQ7XHJcbiAgaG90a2V5Pzogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgYXJncz86IGFueTtcclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0NvbnRleHRTdGF0ZX0gZnJvbSAnLi4vdHlwZXMvY29udGV4dC1zdGF0ZSc7XHJcbmltcG9ydCB7Q29udGV4dE1lbnVJdGVtfSBmcm9tICcuLi90eXBlcy9jb250ZXh0LW1lbnUtaXRlbSc7XHJcbmltcG9ydCB7SG90a2V5LCBIb3RrZXlzU2VydmljZX0gZnJvbSAnYW5ndWxhcjItaG90a2V5cyc7XHJcbmltcG9ydCB7Q29udGV4dE1lbnVFbnRyeX0gZnJvbSAnLi4vdHlwZXMvY29udGV4dC1tZW51LWVudHJ5JztcclxuaW1wb3J0IHtTdWJtZW51fSBmcm9tICcuLi90eXBlcy9zdWJtZW51JztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHJTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0OiBDb250ZXh0TWVudUVudHJ5W10gPSBbXTtcclxuICBwcml2YXRlIGN1cnJlbnRDb250ZXh0OiBDb250ZXh0TWVudUVudHJ5W10gPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0U3RhdGVTdWJqZWN0OiBTdWJqZWN0PENvbnRleHRTdGF0ZT4gPSBuZXcgU3ViamVjdDxDb250ZXh0U3RhdGU+KCk7XHJcbiAgcHJpdmF0ZSBjb250ZXh0U3RhdGVPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPENvbnRleHRTdGF0ZT4gPSB0aGlzLmNvbnRleHRTdGF0ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG90a2V5c1NlcnZpY2U6IEhvdGtleXNTZXJ2aWNlKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzZXQgdGhlIGN1cnJlbnQgY29udGV4dFxyXG4gICAqL1xyXG4gIHB1YmxpYyByZXNldCgpIHtcclxuICAgIHRoaXMuY3VycmVudENvbnRleHQgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGNvbnRleHRcclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqIEBwYXJhbSBhcmd1bWVudHNcclxuICAgKi9cclxuICBwdWJsaWMgYWRkQ3VycmVudENvbnRleHQoY29udGV4dDogc3RyaW5nLCBhcmdzOiBhbnkpIHtcclxuICAgIHRoaXMuYWRkSXRlbXNJbkNvbnRleHQodGhpcy5jb250ZXh0LCBjb250ZXh0LCBhcmdzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVyIGEgY29udGV4dCBtZW51IHBlcnNvbiB0byBzaG93IHVwIGF0IHNvbWUgY29udGV4dFxyXG4gICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICovXHJcbiAgcHVibGljIHJlZ2lzdGVyQ29udGV4dE1lbnVJdGVtKGNvbnRleHQ6IENvbnRleHRNZW51RW50cnkpOiB2b2lkIHtcclxuICAgIHRoaXMuY29udGV4dC5wdXNoKGNvbnRleHQpO1xyXG4gICAgaWYgKChjb250ZXh0IGFzIGFueSkuaG90a2V5ICYmICAoY29udGV4dCBhcyBhbnkpLmhvdGtleSkge1xyXG4gICAgICB0aGlzLmhvdGtleXNTZXJ2aWNlLmFkZChuZXcgSG90a2V5KChjb250ZXh0IGFzIGFueSkuaG90a2V5LCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuID0+IHtcclxuICAgICAgICAoY29udGV4dCBhcyBhbnkpLmFjdGlvbigpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYW4gYXJyYXkgb2YgY29udGV4dCBtZW51IGl0ZW1zXHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBwdWJsaWMgcmVnaXN0ZXJDb250ZXh0TWVudUl0ZW1zKGNvbnRleHQ6IENvbnRleHRNZW51RW50cnlbXSk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0ZXJDb250ZXh0TWVudUl0ZW0oY29udGV4dFtpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBzdGF0ZSBvZiB0aGUgY29udGV4dCBtZW51XHJcbiAgICogQHJldHVybnNcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q29udGV4dFN0YXRlKCk6IE9ic2VydmFibGU8Q29udGV4dFN0YXRlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0U3RhdGVPYnNlcnZhYmxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbiB0aGUgY29udGV4dCBtZW51XHJcbiAgICovXHJcbiAgcHVibGljIG9wZW4oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkSXRlbXNJbkNvbnRleHQodGhpcy5jb250ZXh0LCAnYWxsJywgbnVsbCk7XHJcbiAgICB0aGlzLmNvbnRleHRTdGF0ZVN1YmplY3QubmV4dCh7XHJcbiAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgIGNvbnRleHQ6IHRoaXMuY3VycmVudENvbnRleHQsXHJcbiAgICAgIHRvcDogZXZlbnQuY2xpZW50WSxcclxuICAgICAgbGVmdDogZXZlbnQuY2xpZW50WFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgYWxsIGNvbnRleHQgaXRlbXMgd2l0aCBvdXIgY29udGV4dCBzdHJpbmdcclxuICAgKiBAcGFyYW0gaXRlbXNcclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRJdGVtc0luQ29udGV4dChpdGVtczogQ29udGV4dE1lbnVFbnRyeVtdLCBjb250ZXh0OiBzdHJpbmcsIGFyZ3M6IGFueSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoKGl0ZW1zW2ldIGFzIENvbnRleHRNZW51SXRlbSkuYWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbXNbaV0pIGFzIENvbnRleHRNZW51SXRlbTtcclxuICAgICAgICBpZiAoYXJncyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgYWN0aW9uLmFyZ3MgPSBhcmdzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aW9uLmNvbnRleHQuaW5kZXhPZihjb250ZXh0KSAhPT0gLTEpIHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudENvbnRleHQucHVzaChhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICgoaXRlbXNbaV0gYXMgU3VibWVudSkuY2hpbGRyZW4pIHtcclxuICAgICAgICBjb25zdCBzdWJtZW51ID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbXNbaV0pIGFzIFN1Ym1lbnU7XHJcbiAgICAgICAgdGhpcy5hZGRJdGVtc0luQ29udGV4dChcclxuICAgICAgICAgIChpdGVtc1tpXSBhcyBTdWJtZW51KS5jaGlsZHJlbixcclxuICAgICAgICAgIGNvbnRleHQsXHJcbiAgICAgICAgICBhcmdzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoc3VibWVudS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDb250ZXh0LnB1c2goc3VibWVudSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZSB0aGUgY29udGV4dCBtZW51XHJcbiAgICovXHJcbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZXh0U3RhdGVTdWJqZWN0Lm5leHQoe1xyXG4gICAgICBvcGVuOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7Q29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250ZXh0U3RhdGV9IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtc3RhdGUnO1xyXG5pbXBvcnQge0NvbnRleHJTZXJ2aWNlfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY29udGV4ci5zZXJ2aWNlJztcclxuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0NvbnRleHRNZW51SXRlbX0gZnJvbSAnLi4vLi4vdHlwZXMvY29udGV4dC1tZW51LWl0ZW0nO1xyXG5pbXBvcnQge0NvbnRleHRNZW51RW50cnl9IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtbWVudS1lbnRyeSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2N0eC1jb250ZXh0LW1lbnUnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdlxuICAoY29udGV4dG1lbnUpPVwib25Db250ZXh0TWVudSgkZXZlbnQpXCJcbiAgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gICpuZ0lmPVwib3BlblwiXG4gIGNsYXNzPVwiY29udGV4dC1tZW51IG1lbnVcIlxuICBbbmdTdHlsZV09XCJ7J3RvcC5weCc6IGNvbnRleHRTdGF0ZS50b3AsICdsZWZ0LnB4JzogY29udGV4dFN0YXRlLmxlZnR9XCJcbj5cbiAgPHVsIGNsYXNzPVwiY29udGV4dC1saXN0XCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjb250ZXh0U3RhdGUuY29udGV4dFwiPlxuICAgICAgPGN0eC1jb250ZXh0LW1lbnUtaXRlbSAqbmdJZj1cImlzQWN0aW9uKGl0ZW0pXCIgW2l0ZW1dPVwiaXRlbVwiPjwvY3R4LWNvbnRleHQtbWVudS1pdGVtPlxuICAgICAgPGN0eC1zdWJtZW51ICpuZ0lmPVwiIWlzQWN0aW9uKGl0ZW0pXCIgW2l0ZW1dPVwiaXRlbVwiPjwvY3R4LXN1Ym1lbnU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvdWw+XG48L2Rpdj5cbmAsXHJcbiAgc3R5bGVzOiBbYC5jb250ZXh0LW1lbnV7cG9zaXRpb246YWJzb2x1dGV9OjpuZy1kZWVwIC5tZW51e2JhY2tncm91bmQ6I2ZmZjtib3JkZXI6MXB4IHNvbGlkICNhN2E3YTc7Ym94LXNoYWRvdzowIDAgMTBweCAwIHJnYmEoMCwwLDAsLjUpfTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0e21hcmdpbjowO3BhZGRpbmc6MH06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdCAuY29udGV4dC1saXN0LWl0ZW17bGlzdC1zdHlsZTpub25lO3BhZGRpbmc6NXB4IDdweDttaW4td2lkdGg6MjAwcHg7Y3Vyc29yOnBvaW50ZXJ9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVtIC5mbGV4LWNvbnRhaW5lcntkaXNwbGF5OmZsZXh9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVtIC5zaG9ydGN1dHtmb250LXNpemU6LjhlbTtvcGFjaXR5Oi41O21hcmdpbi1sZWZ0OjEwcHg7bWFyZ2luLXRvcDoycHh9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVtIC5zdWJtZW51e2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW4tdG9wOi0yMHB4fTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbTpob3ZlcntiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjEpfTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbTpob3Zlcj4uc3VibWVudXtkaXNwbGF5OmJsb2NrfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwdWJsaWMgb3BlbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBjb250ZXh0U3RhdGU6IENvbnRleHRTdGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0U3RhdGVTdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGNvbnRleHI6IENvbnRleHJTZXJ2aWNlKSB7XHJcbiAgICAvLyBFdmVudCBjYXB0dXJpbmcgKG5vdCBwb3NzaWJsZSBpbiByZWFsIEFuZ3VsYXIgeWV0KVxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc29sZS5sb2coJ1Jlc2V0IGNvbnRleHQgbWVudSBhbmQgcHJldmVudCBkZWZhdWx0Jyk7XHJcbiAgICAgIHRoaXMuY29udGV4ci5yZXNldCgpO1xyXG4gICAgfSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZSB0aGUgY29udGV4dCBtZW51IHdoZW4gd2UgY2xpY2sgc29tZXdoZXJlIGVsc2VcclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycpXHJcbiAgb25Eb2N1bWVudENsaWNrKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZXhyLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcmV2ZW50IGEgcmlnaHQgY2xpY2sgZnJvbSB0aGUgY29udGV4dCBtZW51IHRvIHByb3BhZ2F0ZSBmdXJ0aGVyXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgb25Db250ZXh0TWVudShldmVudCk6IHZvaWQge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcmV2ZW50IGEgY2xpY2sgZnJvbSB0aGUgY29udGV4dCBtZW51IHRvIHByb3BhZ2F0ZSBmdXJ0aGVyXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgb25DbGljayhldmVudCk6IHZvaWQge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IGNvbnRleHQgbWVudSBmb3Igb3VyIGNvbnRleHQgb3IgZm9yIGFsbFxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNvbnRleHRtZW51JywgWyckZXZlbnQnXSlcclxuICBvbkRvY3VtZW50Q29udGV4dE1lbnUoZXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdPcGVuIGNvbnRleHQgbWVudScpO1xyXG4gICAgdGhpcy5jb250ZXhyLm9wZW4oZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjb250ZXh0IG1lbnUgc3RhdGVcclxuICAgKi9cclxuICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbnRleHRTdGF0ZVN1YiA9IHRoaXMuY29udGV4ci5nZXRDb250ZXh0U3RhdGUoKS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XHJcbiAgICAgIHRoaXMuY29udGV4dFN0YXRlID0gdmFsdWU7XHJcbiAgICAgIHRoaXMub3BlbiA9ICEhdGhpcy5jb250ZXh0U3RhdGUuY29udGV4dDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWIgZnJvbSB0aGUgY29udGV4dCBtZW51IHN0YXRlXHJcbiAgICovXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQgIHtcclxuICAgIHRoaXMuY29udGV4dFN0YXRlU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiB0aGlzIGlzIGFuIGFjdGlvblxyXG4gICAqIEBwYXJhbSBpdGVtXHJcbiAgICogQHJldHVybnNcclxuICAgKi9cclxuICBwdWJsaWMgaXNBY3Rpb24oaXRlbTogQ29udGV4dE1lbnVFbnRyeSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhKGl0ZW0gYXMgQ29udGV4dE1lbnVJdGVtKS5hY3Rpb247XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udGV4dE1lbnVJdGVtfSBmcm9tICcuLi8uLi90eXBlcy9jb250ZXh0LW1lbnUtaXRlbSc7XG5pbXBvcnQge1N1Ym1lbnV9IGZyb20gJy4uLy4uL3R5cGVzL3N1Ym1lbnUnO1xuaW1wb3J0IHtDb250ZXh0TWVudUVudHJ5fSBmcm9tICcuLi8uLi90eXBlcy9jb250ZXh0LW1lbnUtZW50cnknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjdHgtc3VibWVudScsXG4gIHRlbXBsYXRlOiBgPGxpIGNsYXNzPVwiY29udGV4dC1saXN0LWl0ZW1cIj5cbiAgPGRpdiBjbGFzcz1cImZsZXgtY29udGFpbmVyXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJjb250ZXh0XCI+e3tpdGVtLnRleHR9fTwvc3Bhbj5cbiAgICA8c3BhbiBzdHlsZT1cImZsZXg6IDEgMSBhdXRvO1wiPjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cInNob3J0Y3V0XCI+Pj4+PC9zcGFuPlxuICA8L2Rpdj5cbiAgPHVsIGNsYXNzPVwiY29udGV4dC1saXN0IHN1Ym1lbnUgbWVudVwiIFtuZ1N0eWxlXT1cInN1Yk1lbnVTdHlsZVwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHN1Ykl0ZW0gb2YgaXRlbS5jaGlsZHJlblwiPlxuICAgICAgPGN0eC1jb250ZXh0LW1lbnUtaXRlbSAqbmdJZj1cImlzQWN0aW9uKHN1Ykl0ZW0pXCIgW2l0ZW1dPVwic3ViSXRlbVwiPjwvY3R4LWNvbnRleHQtbWVudS1pdGVtPlxuICAgICAgPGN0eC1zdWJtZW51ICpuZ0lmPVwiIWlzQWN0aW9uKHN1Ykl0ZW0pXCIgW2l0ZW1dPVwic3ViSXRlbVwiPjwvY3R4LXN1Ym1lbnU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvdWw+XG48L2xpPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFN1Ym1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGl0ZW06IFN1Ym1lbnU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKSB7IH1cblxuICBwdWJsaWMgc3ViTWVudVN0eWxlID0ge307XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLnN1Yk1lbnVTdHlsZSA9IHtcbiAgICAgICdsZWZ0JzogMjE0ICsgJ3B4JyxcbiAgICAgICd0b3AnOiByZWN0Lm9mZnNldEhlaWdodCArICdweCdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgaXMgYW4gYWN0aW9uXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwdWJsaWMgaXNBY3Rpb24oaXRlbTogQ29udGV4dE1lbnVFbnRyeSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIShpdGVtIGFzIENvbnRleHRNZW51SXRlbSkuYWN0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udGV4dE1lbnVJdGVtfSBmcm9tICcuLi8uLi90eXBlcy9jb250ZXh0LW1lbnUtaXRlbSc7XHJcbmltcG9ydCB7Q29udGV4clNlcnZpY2V9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9jb250ZXhyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjdHgtY29udGV4dC1tZW51LWl0ZW0nLFxyXG4gIHRlbXBsYXRlOiBgPGxpIChjbGljayk9XCJhY3QoKVwiIGNsYXNzPVwiY29udGV4dC1saXN0LWl0ZW1cIj5cclxuICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwiY29udGV4dFwiPnt7aXRlbS50ZXh0fX08L3NwYW4+XHJcbiAgICA8c3BhbiBzdHlsZT1cImZsZXg6IDEgMSBhdXRvO1wiPjwvc3Bhbj5cclxuICAgIDxzcGFuIGNsYXNzPVwic2hvcnRjdXRcIj57e2l0ZW0uaG90a2V5fX08L3NwYW4+XHJcbiAgPC9kaXY+XHJcbjwvbGk+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSBpdGVtOiBDb250ZXh0TWVudUl0ZW07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4cjogQ29udGV4clNlcnZpY2UpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGwgYW4gYWN0aW9uIGFuZCBjbG9zZSB0aGUgY29udGV4dCBtZW51XHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBwdWJsaWMgYWN0KCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2codGhpcy5pdGVtKTtcclxuICAgIHRoaXMuaXRlbS5hY3Rpb24odGhpcy5pdGVtLmFyZ3MpO1xyXG4gICAgdGhpcy5jb250ZXhyLmNsb3NlKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7RGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250ZXhyU2VydmljZX0gZnJvbSAnY29udGV4ci9saWIvcHJvdmlkZXJzL2NvbnRleHIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tjdHhdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dERpcmVjdGl2ZSB7XHJcbiAgQElucHV0KCdjdHgnKSBjdHg6IHN0cmluZztcclxuICBASW5wdXQoJ2N0eEFyZ3MnKSBjdHhBcmdzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4cjogQ29udGV4clNlcnZpY2UpIHt9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25Db250ZXh0TWVudShldmVudCkge1xyXG4gICAgY29uc29sZS5sb2coJ0FkZGluZyBjb250ZXh0OiAnICsgdGhpcy5jdHggKyAnIHdpdGggYXJnczogJyArIHRoaXMuY3R4QXJncyk7XHJcbiAgICB0aGlzLmNvbnRleHIuYWRkQ3VycmVudENvbnRleHQodGhpcy5jdHgsIHRoaXMuY3R4QXJncyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRleHRNZW51Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvY29udGV4dC1tZW51L2NvbnRleHQtbWVudS5jb21wb25lbnQnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtDb250ZXhyU2VydmljZX0gZnJvbSAnLi9wcm92aWRlcnMvY29udGV4ci5zZXJ2aWNlJztcclxuaW1wb3J0IHtIb3RrZXlNb2R1bGV9IGZyb20gJ2FuZ3VsYXIyLWhvdGtleXMnO1xyXG5pbXBvcnQge1N1Ym1lbnVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9zdWJtZW51L3N1Ym1lbnUuY29tcG9uZW50JztcclxuaW1wb3J0IHtDb250ZXh0TWVudUl0ZW1Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9jb250ZXh0LW1lbnUtaXRlbS9jb250ZXh0LW1lbnUtaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb250ZXh0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbnRleHQuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSG90a2V5TW9kdWxlLmZvclJvb3QoKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBDb250ZXh0TWVudUNvbXBvbmVudCxcclxuICAgIFN1Ym1lbnVDb21wb25lbnQsXHJcbiAgICBDb250ZXh0TWVudUl0ZW1Db21wb25lbnQsXHJcbiAgICBDb250ZXh0RGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBDb250ZXh0TWVudUNvbXBvbmVudCxcclxuICAgIENvbnRleHREaXJlY3RpdmVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ29udGV4clNlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXhyTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJDb250ZXhyU2VydmljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtDQUVDOzs7Ozs7QUNGRCxxQkFFNkIsU0FBUSxnQkFBZ0I7Q0FLcEQ7Ozs7OztBQ1BEOzs7O0lBbUJFLFlBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjt1QkFOWixFQUFFOzhCQUNLLEVBQUU7bUNBRU0sSUFBSSxPQUFPLEVBQWdCO3NDQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFO0tBRTNDOzs7OztJQUtoRCxLQUFLO1FBQ1YsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7O0lBUXBCLGlCQUFpQixDQUFDLE9BQWUsRUFBRSxJQUFTO1FBQ2pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7OztJQU8vQyx1QkFBdUIsQ0FBQyxPQUF5QjtRQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FB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