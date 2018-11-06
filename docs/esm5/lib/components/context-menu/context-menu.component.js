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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NvbnRleHIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBRXpFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7SUE4QjdELDhCQUFtQixPQUF1QjtRQUExQyxpQkFPQztRQVBrQixZQUFPLEdBQVAsT0FBTyxDQUFnQjtvQkFMNUIsS0FBSzs7UUFPakIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxVQUFDLEtBQUs7WUFDN0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUN0RCxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3RCLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDVjtJQUVEOztPQUVHOzs7OztJQUVILDhDQUFlOzs7O0lBRGY7UUFFRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3RCO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCw0Q0FBYTs7Ozs7SUFBYixVQUFjLEtBQUs7UUFDakIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3pCO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxzQ0FBTzs7Ozs7SUFBUCxVQUFRLEtBQUs7UUFDWCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7S0FDekI7SUFFRDs7O09BR0c7Ozs7OztJQUVILG9EQUFxQjs7Ozs7SUFEckIsVUFDc0IsS0FBSztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBS00sdUNBQVE7Ozs7OztRQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO1lBQ3BFLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1NBQ3pDLENBQUMsQ0FBQzs7Ozs7O0lBTUUsMENBQVc7Ozs7O1FBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7Ozs7SUFROUIsdUNBQVE7Ozs7O2NBQUMsSUFBc0I7UUFDcEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQkFBQyxJQUF1QixFQUFDLENBQUMsTUFBTSxDQUFDOzs7Z0JBM0Y3QyxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLG9nQkFjWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyw2dUJBQTZ1QixDQUFDO2lCQUN4dkI7Ozs7Z0JBdkJPLGNBQWM7OztrQ0EwQ25CLFlBQVksU0FBQyxnQkFBZ0I7d0NBeUI3QixZQUFZLFNBQUMsc0JBQXNCLEVBQUUsQ0FBQyxRQUFRLENBQUM7OytCQXJFbEQ7O1NBMEJhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250ZXh0U3RhdGV9IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtc3RhdGUnO1xyXG5pbXBvcnQge0NvbnRleHJTZXJ2aWNlfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY29udGV4ci5zZXJ2aWNlJztcclxuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0NvbnRleHRNZW51SXRlbX0gZnJvbSAnLi4vLi4vdHlwZXMvY29udGV4dC1tZW51LWl0ZW0nO1xyXG5pbXBvcnQge0NvbnRleHRNZW51RW50cnl9IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtbWVudS1lbnRyeSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2N0eC1jb250ZXh0LW1lbnUnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdlxuICAoY29udGV4dG1lbnUpPVwib25Db250ZXh0TWVudSgkZXZlbnQpXCJcbiAgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gICpuZ0lmPVwib3BlblwiXG4gIGNsYXNzPVwiY29udGV4dC1tZW51IG1lbnVcIlxuICBbbmdTdHlsZV09XCJ7J3RvcC5weCc6IGNvbnRleHRTdGF0ZS50b3AsICdsZWZ0LnB4JzogY29udGV4dFN0YXRlLmxlZnR9XCJcbj5cbiAgPHVsIGNsYXNzPVwiY29udGV4dC1saXN0XCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjb250ZXh0U3RhdGUuY29udGV4dFwiPlxuICAgICAgPGN0eC1jb250ZXh0LW1lbnUtaXRlbSAqbmdJZj1cImlzQWN0aW9uKGl0ZW0pXCIgW2l0ZW1dPVwiaXRlbVwiPjwvY3R4LWNvbnRleHQtbWVudS1pdGVtPlxuICAgICAgPGN0eC1zdWJtZW51ICpuZ0lmPVwiIWlzQWN0aW9uKGl0ZW0pXCIgW2l0ZW1dPVwiaXRlbVwiPjwvY3R4LXN1Ym1lbnU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvdWw+XG48L2Rpdj5cbmAsXHJcbiAgc3R5bGVzOiBbYC5jb250ZXh0LW1lbnV7cG9zaXRpb246YWJzb2x1dGV9OjpuZy1kZWVwIC5tZW51e2JhY2tncm91bmQ6I2ZmZjtib3JkZXI6MXB4IHNvbGlkICNhN2E3YTc7Ym94LXNoYWRvdzowIDAgMTBweCAwIHJnYmEoMCwwLDAsLjUpfTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0e21hcmdpbjowO3BhZGRpbmc6MH06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdCAuY29udGV4dC1saXN0LWl0ZW17bGlzdC1zdHlsZTpub25lO3BhZGRpbmc6NXB4IDdweDttaW4td2lkdGg6MjAwcHg7Y3Vyc29yOnBvaW50ZXJ9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVtIC5mbGV4LWNvbnRhaW5lcntkaXNwbGF5OmZsZXh9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVtIC5zaG9ydGN1dHtmb250LXNpemU6LjhlbTtvcGFjaXR5Oi41O21hcmdpbi1sZWZ0OjEwcHg7bWFyZ2luLXRvcDoycHh9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVtIC5zdWJtZW51e2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW4tdG9wOi0yMHB4fTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbTpob3ZlcntiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjEpfTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbTpob3Zlcj4uc3VibWVudXtkaXNwbGF5OmJsb2NrfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwdWJsaWMgb3BlbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBjb250ZXh0U3RhdGU6IENvbnRleHRTdGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0U3RhdGVTdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGNvbnRleHI6IENvbnRleHJTZXJ2aWNlKSB7XHJcbiAgICAvLyBFdmVudCBjYXB0dXJpbmcgKG5vdCBwb3NzaWJsZSBpbiByZWFsIEFuZ3VsYXIgeWV0KVxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc29sZS5sb2coJ1Jlc2V0IGNvbnRleHQgbWVudSBhbmQgcHJldmVudCBkZWZhdWx0Jyk7XHJcbiAgICAgIHRoaXMuY29udGV4ci5yZXNldCgpO1xyXG4gICAgfSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZSB0aGUgY29udGV4dCBtZW51IHdoZW4gd2UgY2xpY2sgc29tZXdoZXJlIGVsc2VcclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycpXHJcbiAgb25Eb2N1bWVudENsaWNrKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZXhyLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcmV2ZW50IGEgcmlnaHQgY2xpY2sgZnJvbSB0aGUgY29udGV4dCBtZW51IHRvIHByb3BhZ2F0ZSBmdXJ0aGVyXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgb25Db250ZXh0TWVudShldmVudCk6IHZvaWQge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcmV2ZW50IGEgY2xpY2sgZnJvbSB0aGUgY29udGV4dCBtZW51IHRvIHByb3BhZ2F0ZSBmdXJ0aGVyXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgb25DbGljayhldmVudCk6IHZvaWQge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IGNvbnRleHQgbWVudSBmb3Igb3VyIGNvbnRleHQgb3IgZm9yIGFsbFxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNvbnRleHRtZW51JywgWyckZXZlbnQnXSlcclxuICBvbkRvY3VtZW50Q29udGV4dE1lbnUoZXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdPcGVuIGNvbnRleHQgbWVudScpO1xyXG4gICAgdGhpcy5jb250ZXhyLm9wZW4oZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjb250ZXh0IG1lbnUgc3RhdGVcclxuICAgKi9cclxuICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbnRleHRTdGF0ZVN1YiA9IHRoaXMuY29udGV4ci5nZXRDb250ZXh0U3RhdGUoKS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XHJcbiAgICAgIHRoaXMuY29udGV4dFN0YXRlID0gdmFsdWU7XHJcbiAgICAgIHRoaXMub3BlbiA9ICEhdGhpcy5jb250ZXh0U3RhdGUuY29udGV4dDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWIgZnJvbSB0aGUgY29udGV4dCBtZW51IHN0YXRlXHJcbiAgICovXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQgIHtcclxuICAgIHRoaXMuY29udGV4dFN0YXRlU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiB0aGlzIGlzIGFuIGFjdGlvblxyXG4gICAqIEBwYXJhbSBpdGVtXHJcbiAgICogQHJldHVybnNcclxuICAgKi9cclxuICBwdWJsaWMgaXNBY3Rpb24oaXRlbTogQ29udGV4dE1lbnVFbnRyeSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhKGl0ZW0gYXMgQ29udGV4dE1lbnVJdGVtKS5hY3Rpb247XHJcbiAgfVxyXG59XHJcbiJdfQ==