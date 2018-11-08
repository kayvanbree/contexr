/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, HostListener } from '@angular/core';
import { ContexrService } from '../../providers/contexr.service';
var ContextMenuComponent = /** @class */ (function () {
    function ContextMenuComponent(contexr) {
        var _this = this;
        this.contexr = contexr;
        this.open = false;
        // Event capturing (not possible in real Angular yet)
        document.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            console.log('Reset context menu and prevent default');
            _this.contexr.reset();
        }, true);
    }
    /**
     * Close the context menu when we click somewhere else
     */
    /**
     * Close the context menu when we click somewhere else
     * @return {?}
     */
    ContextMenuComponent.prototype.onDocumentClick = /**
     * Close the context menu when we click somewhere else
     * @return {?}
     */
    function () {
        this.contexr.close();
    };
    /**
     * Prevent a right click from the context menu to propagate further
     * @param event
     */
    /**
     * Prevent a right click from the context menu to propagate further
     * @param {?} event
     * @return {?}
     */
    ContextMenuComponent.prototype.onContextMenu = /**
     * Prevent a right click from the context menu to propagate further
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
    };
    /**
     * Prevent a click from the context menu to propagate further
     * @param event
     */
    /**
     * Prevent a click from the context menu to propagate further
     * @param {?} event
     * @return {?}
     */
    ContextMenuComponent.prototype.onClick = /**
     * Prevent a click from the context menu to propagate further
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
    };
    /**
     * Show context menu for our context or for all
     * @param event
     */
    /**
     * Show context menu for our context or for all
     * @param {?} event
     * @return {?}
     */
    ContextMenuComponent.prototype.onDocumentContextMenu = /**
     * Show context menu for our context or for all
     * @param {?} event
     * @return {?}
     */
    function (event) {
        console.log('Open context menu');
        this.contexr.open(event);
    };
    /**
     * Subscribe to the context menu state
     * @return {?}
     */
    ContextMenuComponent.prototype.ngOnInit = /**
     * Subscribe to the context menu state
     * @return {?}
     */
    function () {
        var _this = this;
        this.contextStateSub = this.contexr.getContextState().subscribe(function (value) {
            _this.contextState = value;
            _this.open = !!_this.contextState.context;
        });
    };
    /**
     * Unsub from the context menu state
     * @return {?}
     */
    ContextMenuComponent.prototype.ngOnDestroy = /**
     * Unsub from the context menu state
     * @return {?}
     */
    function () {
        this.contextStateSub.unsubscribe();
    };
    /**
     * Check if this is an action
     * @param {?} item
     * @return {?}
     */
    ContextMenuComponent.prototype.isAction = /**
     * Check if this is an action
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return !!(/** @type {?} */ (item)).action;
    };
    ContextMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ctx-context-menu',
                    template: "<div\n  (contextmenu)=\"onContextMenu($event)\"\n  (click)=\"onClick($event)\"\n  *ngIf=\"open\"\n  class=\"context-menu menu\"\n  [ngStyle]=\"{'top.px': contextState.top, 'left.px': contextState.left}\"\n>\n  <ul class=\"context-list\">\n    <ng-container *ngFor=\"let item of contextState.context\">\n      <ctx-context-menu-item *ngIf=\"isAction(item)\" [item]=\"item\"></ctx-context-menu-item>\n      <ctx-submenu *ngIf=\"!isAction(item)\" [item]=\"item\"></ctx-submenu>\n    </ng-container>\n  </ul>\n</div>\n",
                    styles: [".context-menu{position:absolute}::ng-deep .menu{background:#fff;border:1px solid #a7a7a7;box-shadow:0 0 10px 0 rgba(0,0,0,.5)}::ng-deep .menu .context-list{margin:0;padding:0}::ng-deep .menu .context-list .context-list-item{list-style:none;padding:5px 7px;min-width:200px;cursor:pointer}::ng-deep .menu .context-list .context-list-item .flex-container{display:flex}::ng-deep .menu .context-list .context-list-item .shortcut{font-size:.8em;opacity:.5;margin-left:10px;margin-top:2px}::ng-deep .menu .context-list .context-list-item .submenu{display:none;position:absolute;margin-top:-20px}::ng-deep .menu .context-list .context-list-item:hover{background:rgba(0,0,0,.1)}::ng-deep .menu .context-list .context-list-item:hover>.submenu{display:block}"]
                },] },
    ];
    /** @nocollapse */
    ContextMenuComponent.ctorParameters = function () { return [
        { type: ContexrService }
    ]; };
    ContextMenuComponent.propDecorators = {
        onDocumentClick: [{ type: HostListener, args: ['document:click',] }],
        onDocumentContextMenu: [{ type: HostListener, args: ['document:contextmenu', ['$event'],] }]
    };
    return ContextMenuComponent;
}());
export { ContextMenuComponent };
if (false) {
    /** @type {?} */
    ContextMenuComponent.prototype.open;
    /** @type {?} */
    ContextMenuComponent.prototype.contextState;
    /** @type {?} */
    ContextMenuComponent.prototype.contextStateSub;
    /** @type {?} */
    ContextMenuComponent.prototype.contexr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NvbnRleHIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBRXpFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7SUE4QjdELDhCQUFtQixPQUF1QjtRQUExQyxpQkFPQztRQVBrQixZQUFPLEdBQVAsT0FBTyxDQUFnQjtvQkFMNUIsS0FBSzs7UUFPakIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxVQUFDLEtBQUs7WUFDN0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUN0RCxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3RCLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDVjtJQUVEOztPQUVHOzs7OztJQUVILDhDQUFlOzs7O0lBRGY7UUFFRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3RCO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCw0Q0FBYTs7Ozs7SUFBYixVQUFjLEtBQUs7UUFDakIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3pCO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxzQ0FBTzs7Ozs7SUFBUCxVQUFRLEtBQUs7UUFDWCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7S0FDekI7SUFFRDs7O09BR0c7Ozs7OztJQUVILG9EQUFxQjs7Ozs7SUFEckIsVUFDc0IsS0FBSztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBS00sdUNBQVE7Ozs7OztRQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO1lBQ3BFLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1NBQ3pDLENBQUMsQ0FBQzs7Ozs7O0lBTUUsMENBQVc7Ozs7O1FBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7Ozs7SUFROUIsdUNBQVE7Ozs7O2NBQUMsSUFBc0I7UUFDcEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQkFBQyxJQUF1QixFQUFDLENBQUMsTUFBTSxDQUFDOzs7Z0JBM0Y3QyxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLG9nQkFjWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyw2dUJBQTZ1QixDQUFDO2lCQUN4dkI7Ozs7Z0JBdkJPLGNBQWM7OztrQ0EwQ25CLFlBQVksU0FBQyxnQkFBZ0I7d0NBeUI3QixZQUFZLFNBQUMsc0JBQXNCLEVBQUUsQ0FBQyxRQUFRLENBQUM7OytCQXJFbEQ7O1NBMEJhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250ZXh0U3RhdGV9IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtc3RhdGUnO1xyXG5pbXBvcnQge0NvbnRleHJTZXJ2aWNlfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY29udGV4ci5zZXJ2aWNlJztcclxuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0NvbnRleHRNZW51SXRlbX0gZnJvbSAnLi4vLi4vdHlwZXMvY29udGV4dC1tZW51LWl0ZW0nO1xyXG5pbXBvcnQge0NvbnRleHRNZW51RW50cnl9IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtbWVudS1lbnRyeSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2N0eC1jb250ZXh0LW1lbnUnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdlxyXG4gIChjb250ZXh0bWVudSk9XCJvbkNvbnRleHRNZW51KCRldmVudClcIlxyXG4gIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICpuZ0lmPVwib3BlblwiXHJcbiAgY2xhc3M9XCJjb250ZXh0LW1lbnUgbWVudVwiXHJcbiAgW25nU3R5bGVdPVwieyd0b3AucHgnOiBjb250ZXh0U3RhdGUudG9wLCAnbGVmdC5weCc6IGNvbnRleHRTdGF0ZS5sZWZ0fVwiXHJcbj5cclxuICA8dWwgY2xhc3M9XCJjb250ZXh0LWxpc3RcIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgY29udGV4dFN0YXRlLmNvbnRleHRcIj5cclxuICAgICAgPGN0eC1jb250ZXh0LW1lbnUtaXRlbSAqbmdJZj1cImlzQWN0aW9uKGl0ZW0pXCIgW2l0ZW1dPVwiaXRlbVwiPjwvY3R4LWNvbnRleHQtbWVudS1pdGVtPlxyXG4gICAgICA8Y3R4LXN1Ym1lbnUgKm5nSWY9XCIhaXNBY3Rpb24oaXRlbSlcIiBbaXRlbV09XCJpdGVtXCI+PC9jdHgtc3VibWVudT5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvdWw+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AuY29udGV4dC1tZW51e3Bvc2l0aW9uOmFic29sdXRlfTo6bmctZGVlcCAubWVudXtiYWNrZ3JvdW5kOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjYTdhN2E3O2JveC1zaGFkb3c6MCAwIDEwcHggMCByZ2JhKDAsMCwwLC41KX06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdHttYXJnaW46MDtwYWRkaW5nOjB9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVte2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nOjVweCA3cHg7bWluLXdpZHRoOjIwMHB4O2N1cnNvcjpwb2ludGVyfTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbSAuZmxleC1jb250YWluZXJ7ZGlzcGxheTpmbGV4fTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbSAuc2hvcnRjdXR7Zm9udC1zaXplOi44ZW07b3BhY2l0eTouNTttYXJnaW4tbGVmdDoxMHB4O21hcmdpbi10b3A6MnB4fTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbSAuc3VibWVudXtkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luLXRvcDotMjBweH06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdCAuY29udGV4dC1saXN0LWl0ZW06aG92ZXJ7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4xKX06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdCAuY29udGV4dC1saXN0LWl0ZW06aG92ZXI+LnN1Ym1lbnV7ZGlzcGxheTpibG9ja31gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHVibGljIG9wZW4gPSBmYWxzZTtcclxuICBwdWJsaWMgY29udGV4dFN0YXRlOiBDb250ZXh0U3RhdGU7XHJcblxyXG4gIHByaXZhdGUgY29udGV4dFN0YXRlU3ViOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZXhyOiBDb250ZXhyU2VydmljZSkge1xyXG4gICAgLy8gRXZlbnQgY2FwdHVyaW5nIChub3QgcG9zc2libGUgaW4gcmVhbCBBbmd1bGFyIHlldClcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdSZXNldCBjb250ZXh0IG1lbnUgYW5kIHByZXZlbnQgZGVmYXVsdCcpO1xyXG4gICAgICB0aGlzLmNvbnRleHIucmVzZXQoKTtcclxuICAgIH0sIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2UgdGhlIGNvbnRleHQgbWVudSB3aGVuIHdlIGNsaWNrIHNvbWV3aGVyZSBlbHNlXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snKVxyXG4gIG9uRG9jdW1lbnRDbGljaygpOiB2b2lkIHtcclxuICAgIHRoaXMuY29udGV4ci5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJldmVudCBhIHJpZ2h0IGNsaWNrIGZyb20gdGhlIGNvbnRleHQgbWVudSB0byBwcm9wYWdhdGUgZnVydGhlclxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIG9uQ29udGV4dE1lbnUoZXZlbnQpOiB2b2lkIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJldmVudCBhIGNsaWNrIGZyb20gdGhlIGNvbnRleHQgbWVudSB0byBwcm9wYWdhdGUgZnVydGhlclxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIG9uQ2xpY2soZXZlbnQpOiB2b2lkIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBjb250ZXh0IG1lbnUgZm9yIG91ciBjb250ZXh0IG9yIGZvciBhbGxcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXHJcbiAgb25Eb2N1bWVudENvbnRleHRNZW51KGV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnT3BlbiBjb250ZXh0IG1lbnUnKTtcclxuICAgIHRoaXMuY29udGV4ci5vcGVuKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byB0aGUgY29udGV4dCBtZW51IHN0YXRlXHJcbiAgICovXHJcbiAgcHVibGljIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jb250ZXh0U3RhdGVTdWIgPSB0aGlzLmNvbnRleHIuZ2V0Q29udGV4dFN0YXRlKCkuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICB0aGlzLmNvbnRleHRTdGF0ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLm9wZW4gPSAhIXRoaXMuY29udGV4dFN0YXRlLmNvbnRleHQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3ViIGZyb20gdGhlIGNvbnRleHQgbWVudSBzdGF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkICB7XHJcbiAgICB0aGlzLmNvbnRleHRTdGF0ZVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgdGhpcyBpcyBhbiBhY3Rpb25cclxuICAgKiBAcGFyYW0gaXRlbVxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgcHVibGljIGlzQWN0aW9uKGl0ZW06IENvbnRleHRNZW51RW50cnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhIShpdGVtIGFzIENvbnRleHRNZW51SXRlbSkuYWN0aW9uO1xyXG4gIH1cclxufVxyXG4iXX0=