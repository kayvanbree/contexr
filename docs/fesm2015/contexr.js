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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4ci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vY29udGV4ci9saWIvdHlwZXMvY29udGV4dC1tZW51LWVudHJ5LnRzIiwibmc6Ly9jb250ZXhyL2xpYi90eXBlcy9jb250ZXh0LW1lbnUtaXRlbS50cyIsIm5nOi8vY29udGV4ci9saWIvcHJvdmlkZXJzL2NvbnRleHIuc2VydmljZS50cyIsIm5nOi8vY29udGV4ci9saWIvY29tcG9uZW50cy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vY29udGV4ci9saWIvY29tcG9uZW50cy9zdWJtZW51L3N1Ym1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9jb250ZXhyL2xpYi9jb21wb25lbnRzL2NvbnRleHQtbWVudS1pdGVtL2NvbnRleHQtbWVudS1pdGVtLmNvbXBvbmVudC50cyIsIm5nOi8vY29udGV4ci9saWIvZGlyZWN0aXZlcy9jb250ZXh0LmRpcmVjdGl2ZS50cyIsIm5nOi8vY29udGV4ci9saWIvY29udGV4ci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENvbnRleHRNZW51RW50cnkge1xyXG4gIHRleHQ6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQge0NvbnRleHRNZW51RW50cnl9IGZyb20gJy4vY29udGV4dC1tZW51LWVudHJ5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudUl0ZW0gZXh0ZW5kcyBDb250ZXh0TWVudUVudHJ5IHtcclxuICBjb250ZXh0OiBzdHJpbmdbXTtcclxuICBhY3Rpb246IChhcmdzOiBhbnkpID0+IHZvaWQ7XHJcbiAgaG90a2V5Pzogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgYXJncz86IGFueTtcclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0NvbnRleHRTdGF0ZX0gZnJvbSAnLi4vdHlwZXMvY29udGV4dC1zdGF0ZSc7XHJcbmltcG9ydCB7Q29udGV4dE1lbnVJdGVtfSBmcm9tICcuLi90eXBlcy9jb250ZXh0LW1lbnUtaXRlbSc7XHJcbmltcG9ydCB7SG90a2V5LCBIb3RrZXlzU2VydmljZX0gZnJvbSAnYW5ndWxhcjItaG90a2V5cyc7XHJcbmltcG9ydCB7Q29udGV4dE1lbnVFbnRyeX0gZnJvbSAnLi4vdHlwZXMvY29udGV4dC1tZW51LWVudHJ5JztcclxuaW1wb3J0IHtTdWJtZW51fSBmcm9tICcuLi90eXBlcy9zdWJtZW51JztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHJTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0OiBDb250ZXh0TWVudUVudHJ5W10gPSBbXTtcclxuICBwcml2YXRlIGN1cnJlbnRDb250ZXh0OiBDb250ZXh0TWVudUVudHJ5W10gPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0U3RhdGVTdWJqZWN0OiBTdWJqZWN0PENvbnRleHRTdGF0ZT4gPSBuZXcgU3ViamVjdDxDb250ZXh0U3RhdGU+KCk7XHJcbiAgcHJpdmF0ZSBjb250ZXh0U3RhdGVPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPENvbnRleHRTdGF0ZT4gPSB0aGlzLmNvbnRleHRTdGF0ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG90a2V5c1NlcnZpY2U6IEhvdGtleXNTZXJ2aWNlKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzZXQgdGhlIGN1cnJlbnQgY29udGV4dFxyXG4gICAqL1xyXG4gIHB1YmxpYyByZXNldCgpIHtcclxuICAgIHRoaXMuY3VycmVudENvbnRleHQgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGNvbnRleHRcclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqIEBwYXJhbSBhcmd1bWVudHNcclxuICAgKi9cclxuICBwdWJsaWMgYWRkQ3VycmVudENvbnRleHQoY29udGV4dDogc3RyaW5nLCBhcmdzOiBhbnkpIHtcclxuICAgIHRoaXMuYWRkSXRlbXNJbkNvbnRleHQodGhpcy5jb250ZXh0LCBjb250ZXh0LCBhcmdzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVyIGEgY29udGV4dCBtZW51IHBlcnNvbiB0byBzaG93IHVwIGF0IHNvbWUgY29udGV4dFxyXG4gICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICovXHJcbiAgcHVibGljIHJlZ2lzdGVyQ29udGV4dE1lbnVJdGVtKGNvbnRleHQ6IENvbnRleHRNZW51RW50cnkpOiB2b2lkIHtcclxuICAgIHRoaXMuY29udGV4dC5wdXNoKGNvbnRleHQpO1xyXG4gICAgaWYgKChjb250ZXh0IGFzIGFueSkuaG90a2V5ICYmICAoY29udGV4dCBhcyBhbnkpLmhvdGtleSkge1xyXG4gICAgICB0aGlzLmhvdGtleXNTZXJ2aWNlLmFkZChuZXcgSG90a2V5KChjb250ZXh0IGFzIGFueSkuaG90a2V5LCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuID0+IHtcclxuICAgICAgICAoY29udGV4dCBhcyBhbnkpLmFjdGlvbigpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYW4gYXJyYXkgb2YgY29udGV4dCBtZW51IGl0ZW1zXHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBwdWJsaWMgcmVnaXN0ZXJDb250ZXh0TWVudUl0ZW1zKGNvbnRleHQ6IENvbnRleHRNZW51RW50cnlbXSk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0ZXJDb250ZXh0TWVudUl0ZW0oY29udGV4dFtpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBzdGF0ZSBvZiB0aGUgY29udGV4dCBtZW51XHJcbiAgICogQHJldHVybnNcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q29udGV4dFN0YXRlKCk6IE9ic2VydmFibGU8Q29udGV4dFN0YXRlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0U3RhdGVPYnNlcnZhYmxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbiB0aGUgY29udGV4dCBtZW51XHJcbiAgICovXHJcbiAgcHVibGljIG9wZW4oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkSXRlbXNJbkNvbnRleHQodGhpcy5jb250ZXh0LCAnYWxsJywgbnVsbCk7XHJcbiAgICB0aGlzLmNvbnRleHRTdGF0ZVN1YmplY3QubmV4dCh7XHJcbiAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgIGNvbnRleHQ6IHRoaXMuY3VycmVudENvbnRleHQsXHJcbiAgICAgIHRvcDogZXZlbnQuY2xpZW50WSArIHdpbmRvdy5wYWdlWU9mZnNldCxcclxuICAgICAgbGVmdDogZXZlbnQuY2xpZW50WFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgYWxsIGNvbnRleHQgaXRlbXMgd2l0aCBvdXIgY29udGV4dCBzdHJpbmdcclxuICAgKiBAcGFyYW0gaXRlbXNcclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRJdGVtc0luQ29udGV4dChpdGVtczogQ29udGV4dE1lbnVFbnRyeVtdLCBjb250ZXh0OiBzdHJpbmcsIGFyZ3M6IGFueSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoKGl0ZW1zW2ldIGFzIENvbnRleHRNZW51SXRlbSkuYWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbXNbaV0pIGFzIENvbnRleHRNZW51SXRlbTtcclxuICAgICAgICBpZiAoYXJncyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgYWN0aW9uLmFyZ3MgPSBhcmdzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aW9uLmNvbnRleHQuaW5kZXhPZihjb250ZXh0KSAhPT0gLTEpIHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudENvbnRleHQucHVzaChhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICgoaXRlbXNbaV0gYXMgU3VibWVudSkuY2hpbGRyZW4pIHtcclxuICAgICAgICBjb25zdCBzdWJtZW51ID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbXNbaV0pIGFzIFN1Ym1lbnU7XHJcbiAgICAgICAgdGhpcy5hZGRJdGVtc0luQ29udGV4dChcclxuICAgICAgICAgIChpdGVtc1tpXSBhcyBTdWJtZW51KS5jaGlsZHJlbixcclxuICAgICAgICAgIGNvbnRleHQsXHJcbiAgICAgICAgICBhcmdzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoc3VibWVudS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDb250ZXh0LnB1c2goc3VibWVudSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZSB0aGUgY29udGV4dCBtZW51XHJcbiAgICovXHJcbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZXh0U3RhdGVTdWJqZWN0Lm5leHQoe1xyXG4gICAgICBvcGVuOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7Q29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250ZXh0U3RhdGV9IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtc3RhdGUnO1xyXG5pbXBvcnQge0NvbnRleHJTZXJ2aWNlfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY29udGV4ci5zZXJ2aWNlJztcclxuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0NvbnRleHRNZW51SXRlbX0gZnJvbSAnLi4vLi4vdHlwZXMvY29udGV4dC1tZW51LWl0ZW0nO1xyXG5pbXBvcnQge0NvbnRleHRNZW51RW50cnl9IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtbWVudS1lbnRyeSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2N0eC1jb250ZXh0LW1lbnUnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdlxyXG4gIChjb250ZXh0bWVudSk9XCJvbkNvbnRleHRNZW51KCRldmVudClcIlxyXG4gIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICpuZ0lmPVwib3BlblwiXHJcbiAgY2xhc3M9XCJjb250ZXh0LW1lbnUgbWVudVwiXHJcbiAgW25nU3R5bGVdPVwieyd0b3AucHgnOiBjb250ZXh0U3RhdGUudG9wLCAnbGVmdC5weCc6IGNvbnRleHRTdGF0ZS5sZWZ0fVwiXHJcbj5cclxuICA8dWwgY2xhc3M9XCJjb250ZXh0LWxpc3RcIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgY29udGV4dFN0YXRlLmNvbnRleHRcIj5cclxuICAgICAgPGN0eC1jb250ZXh0LW1lbnUtaXRlbSAqbmdJZj1cImlzQWN0aW9uKGl0ZW0pXCIgW2l0ZW1dPVwiaXRlbVwiPjwvY3R4LWNvbnRleHQtbWVudS1pdGVtPlxyXG4gICAgICA8Y3R4LXN1Ym1lbnUgKm5nSWY9XCIhaXNBY3Rpb24oaXRlbSlcIiBbaXRlbV09XCJpdGVtXCI+PC9jdHgtc3VibWVudT5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvdWw+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AuY29udGV4dC1tZW51e3Bvc2l0aW9uOmFic29sdXRlfTo6bmctZGVlcCAubWVudXtiYWNrZ3JvdW5kOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjYTdhN2E3O2JveC1zaGFkb3c6MCAwIDEwcHggMCByZ2JhKDAsMCwwLC41KX06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdHttYXJnaW46MDtwYWRkaW5nOjB9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVte2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nOjVweCA3cHg7bWluLXdpZHRoOjIwMHB4O2N1cnNvcjpwb2ludGVyfTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbSAuZmxleC1jb250YWluZXJ7ZGlzcGxheTpmbGV4fTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbSAuc2hvcnRjdXR7Zm9udC1zaXplOi44ZW07b3BhY2l0eTouNTttYXJnaW4tbGVmdDoxMHB4O21hcmdpbi10b3A6MnB4fTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbSAuc3VibWVudXtkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luLXRvcDotMjBweH06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdCAuY29udGV4dC1saXN0LWl0ZW06aG92ZXJ7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4xKX06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdCAuY29udGV4dC1saXN0LWl0ZW06aG92ZXI+LnN1Ym1lbnV7ZGlzcGxheTpibG9ja31gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHVibGljIG9wZW4gPSBmYWxzZTtcclxuICBwdWJsaWMgY29udGV4dFN0YXRlOiBDb250ZXh0U3RhdGU7XHJcblxyXG4gIHByaXZhdGUgY29udGV4dFN0YXRlU3ViOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZXhyOiBDb250ZXhyU2VydmljZSkge1xyXG4gICAgLy8gRXZlbnQgY2FwdHVyaW5nIChub3QgcG9zc2libGUgaW4gcmVhbCBBbmd1bGFyIHlldClcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdSZXNldCBjb250ZXh0IG1lbnUgYW5kIHByZXZlbnQgZGVmYXVsdCcpO1xyXG4gICAgICB0aGlzLmNvbnRleHIucmVzZXQoKTtcclxuICAgIH0sIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2UgdGhlIGNvbnRleHQgbWVudSB3aGVuIHdlIGNsaWNrIHNvbWV3aGVyZSBlbHNlXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snKVxyXG4gIG9uRG9jdW1lbnRDbGljaygpOiB2b2lkIHtcclxuICAgIHRoaXMuY29udGV4ci5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJldmVudCBhIHJpZ2h0IGNsaWNrIGZyb20gdGhlIGNvbnRleHQgbWVudSB0byBwcm9wYWdhdGUgZnVydGhlclxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIG9uQ29udGV4dE1lbnUoZXZlbnQpOiB2b2lkIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJldmVudCBhIGNsaWNrIGZyb20gdGhlIGNvbnRleHQgbWVudSB0byBwcm9wYWdhdGUgZnVydGhlclxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIG9uQ2xpY2soZXZlbnQpOiB2b2lkIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBjb250ZXh0IG1lbnUgZm9yIG91ciBjb250ZXh0IG9yIGZvciBhbGxcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXHJcbiAgb25Eb2N1bWVudENvbnRleHRNZW51KGV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnT3BlbiBjb250ZXh0IG1lbnUnKTtcclxuICAgIHRoaXMuY29udGV4ci5vcGVuKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byB0aGUgY29udGV4dCBtZW51IHN0YXRlXHJcbiAgICovXHJcbiAgcHVibGljIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jb250ZXh0U3RhdGVTdWIgPSB0aGlzLmNvbnRleHIuZ2V0Q29udGV4dFN0YXRlKCkuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICB0aGlzLmNvbnRleHRTdGF0ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLm9wZW4gPSAhIXRoaXMuY29udGV4dFN0YXRlLmNvbnRleHQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3ViIGZyb20gdGhlIGNvbnRleHQgbWVudSBzdGF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkICB7XHJcbiAgICB0aGlzLmNvbnRleHRTdGF0ZVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgdGhpcyBpcyBhbiBhY3Rpb25cclxuICAgKiBAcGFyYW0gaXRlbVxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgcHVibGljIGlzQWN0aW9uKGl0ZW06IENvbnRleHRNZW51RW50cnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhIShpdGVtIGFzIENvbnRleHRNZW51SXRlbSkuYWN0aW9uO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRleHRNZW51SXRlbX0gZnJvbSAnLi4vLi4vdHlwZXMvY29udGV4dC1tZW51LWl0ZW0nO1xuaW1wb3J0IHtTdWJtZW51fSBmcm9tICcuLi8uLi90eXBlcy9zdWJtZW51JztcbmltcG9ydCB7Q29udGV4dE1lbnVFbnRyeX0gZnJvbSAnLi4vLi4vdHlwZXMvY29udGV4dC1tZW51LWVudHJ5JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3R4LXN1Ym1lbnUnLFxuICB0ZW1wbGF0ZTogYDxsaSBjbGFzcz1cImNvbnRleHQtbGlzdC1pdGVtXCI+XG4gIDxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lclwiPlxuICAgIDxzcGFuIGNsYXNzPVwiY29udGV4dFwiPnt7aXRlbS50ZXh0fX08L3NwYW4+XG4gICAgPHNwYW4gc3R5bGU9XCJmbGV4OiAxIDEgYXV0bztcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJzaG9ydGN1dFwiPj4+Pjwvc3Bhbj5cbiAgPC9kaXY+XG4gIDx1bCBjbGFzcz1cImNvbnRleHQtbGlzdCBzdWJtZW51IG1lbnVcIiBbbmdTdHlsZV09XCJzdWJNZW51U3R5bGVcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBzdWJJdGVtIG9mIGl0ZW0uY2hpbGRyZW5cIj5cbiAgICAgIDxjdHgtY29udGV4dC1tZW51LWl0ZW0gKm5nSWY9XCJpc0FjdGlvbihzdWJJdGVtKVwiIFtpdGVtXT1cInN1Ykl0ZW1cIj48L2N0eC1jb250ZXh0LW1lbnUtaXRlbT5cbiAgICAgIDxjdHgtc3VibWVudSAqbmdJZj1cIiFpc0FjdGlvbihzdWJJdGVtKVwiIFtpdGVtXT1cInN1Ykl0ZW1cIj48L2N0eC1zdWJtZW51PlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L3VsPlxuPC9saT5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWJtZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBpdGVtOiBTdWJtZW51O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZikgeyB9XG5cbiAgcHVibGljIHN1Yk1lbnVTdHlsZSA9IHt9O1xuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5zdWJNZW51U3R5bGUgPSB7XG4gICAgICAnbGVmdCc6IDIxNCArICdweCcsXG4gICAgICAndG9wJzogcmVjdC5vZmZzZXRIZWlnaHQgKyAncHgnXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGlzIGlzIGFuIGFjdGlvblxuICAgKiBAcGFyYW0gaXRlbVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIGlzQWN0aW9uKGl0ZW06IENvbnRleHRNZW51RW50cnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEoaXRlbSBhcyBDb250ZXh0TWVudUl0ZW0pLmFjdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRleHRNZW51SXRlbX0gZnJvbSAnLi4vLi4vdHlwZXMvY29udGV4dC1tZW51LWl0ZW0nO1xyXG5pbXBvcnQge0NvbnRleHJTZXJ2aWNlfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY29udGV4ci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY3R4LWNvbnRleHQtbWVudS1pdGVtJyxcclxuICB0ZW1wbGF0ZTogYDxsaSAoY2xpY2spPVwiYWN0KClcIiBjbGFzcz1cImNvbnRleHQtbGlzdC1pdGVtXCI+XHJcbiAgPGRpdiBjbGFzcz1cImZsZXgtY29udGFpbmVyXCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cImNvbnRleHRcIj57e2l0ZW0udGV4dH19PC9zcGFuPlxyXG4gICAgPHNwYW4gc3R5bGU9XCJmbGV4OiAxIDEgYXV0bztcIj48L3NwYW4+XHJcbiAgICA8c3BhbiBjbGFzcz1cInNob3J0Y3V0XCI+e3tpdGVtLmhvdGtleX19PC9zcGFuPlxyXG4gIDwvZGl2PlxyXG48L2xpPlxyXG5gLFxyXG4gIHN0eWxlczogW2BgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnVJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgaXRlbTogQ29udGV4dE1lbnVJdGVtO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRleHI6IENvbnRleHJTZXJ2aWNlKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsIGFuIGFjdGlvbiBhbmQgY2xvc2UgdGhlIGNvbnRleHQgbWVudVxyXG4gICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICovXHJcbiAgcHVibGljIGFjdCgpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuaXRlbSk7XHJcbiAgICB0aGlzLml0ZW0uYWN0aW9uKHRoaXMuaXRlbS5hcmdzKTtcclxuICAgIHRoaXMuY29udGV4ci5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udGV4clNlcnZpY2V9IGZyb20gJ2NvbnRleHIvbGliL3Byb3ZpZGVycy9jb250ZXhyLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbY3R4XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHREaXJlY3RpdmUge1xyXG4gIEBJbnB1dCgnY3R4JykgY3R4OiBzdHJpbmc7XHJcbiAgQElucHV0KCdjdHhBcmdzJykgY3R4QXJnczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRleHI6IENvbnRleHJTZXJ2aWNlKSB7fVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uQ29udGV4dE1lbnUoZXZlbnQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgY29udGV4dDogJyArIHRoaXMuY3R4ICsgJyB3aXRoIGFyZ3M6ICcgKyB0aGlzLmN0eEFyZ3MpO1xyXG4gICAgdGhpcy5jb250ZXhyLmFkZEN1cnJlbnRDb250ZXh0KHRoaXMuY3R4LCB0aGlzLmN0eEFyZ3MpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250ZXh0TWVudUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuY29tcG9uZW50JztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Q29udGV4clNlcnZpY2V9IGZyb20gJy4vcHJvdmlkZXJzL2NvbnRleHIuc2VydmljZSc7XHJcbmltcG9ydCB7SG90a2V5TW9kdWxlfSBmcm9tICdhbmd1bGFyMi1ob3RrZXlzJztcclxuaW1wb3J0IHtTdWJtZW51Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc3VibWVudS9zdWJtZW51LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Q29udGV4dE1lbnVJdGVtQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvY29udGV4dC1tZW51LWl0ZW0vY29udGV4dC1tZW51LWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29udGV4dERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9jb250ZXh0LmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEhvdGtleU1vZHVsZS5mb3JSb290KClcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQ29udGV4dE1lbnVDb21wb25lbnQsXHJcbiAgICBTdWJtZW51Q29tcG9uZW50LFxyXG4gICAgQ29udGV4dE1lbnVJdGVtQ29tcG9uZW50LFxyXG4gICAgQ29udGV4dERpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQ29udGV4dE1lbnVDb21wb25lbnQsXHJcbiAgICBDb250ZXh0RGlyZWN0aXZlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENvbnRleHJTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4ck1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiQ29udGV4clNlcnZpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Q0FFQzs7Ozs7O0FDRkQscUJBRTZCLFNBQVEsZ0JBQWdCO0NBS3BEOzs7Ozs7QUNQRDs7OztJQW1CRSxZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7dUJBTlosRUFBRTs4QkFDSyxFQUFFO21DQUVNLElBQUksT0FBTyxFQUFnQjtzQ0FDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRTtLQUUzQzs7Ozs7SUFLaEQsS0FBSztRQUNWLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDOzs7Ozs7OztJQVFwQixpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsSUFBUztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7SUFPL0MsdUJBQXVCLENBQUMsT0FBeUI7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