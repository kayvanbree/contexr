/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ContextMenuItem } from '../../types/context-menu-item';
import { ContexrService } from '../../providers/contexr.service';
var ContextMenuItemComponent = /** @class */ (function () {
    function ContextMenuItemComponent(contexr) {
        this.contexr = contexr;
    }
    /**
     * @return {?}
     */
    ContextMenuItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * Call an action and close the context menu
     * @return {?}
     */
    ContextMenuItemComponent.prototype.act = /**
     * Call an action and close the context menu
     * @return {?}
     */
    function () {
        console.log(this.item);
        this.item.action(this.item.args);
        this.contexr.close();
    };
    ContextMenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ctx-context-menu-item',
                    template: "<li (click)=\"act()\" class=\"context-list-item\">\n  <div class=\"flex-container\">\n    <span class=\"context\">{{item.text}}</span>\n    <span style=\"flex: 1 1 auto;\"></span>\n    <span class=\"shortcut\">{{item.hotkey}}</span>\n  </div>\n</li>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    ContextMenuItemComponent.ctorParameters = function () { return [
        { type: ContexrService }
    ]; };
    ContextMenuItemComponent.propDecorators = {
        item: [{ type: Input }]
    };
    return ContextMenuItemComponent;
}());
export { ContextMenuItemComponent };
if (false) {
    /** @type {?} */
    ContextMenuItemComponent.prototype.item;
    /** @type {?} */
    ContextMenuItemComponent.prototype.contexr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29udGV4ci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2NvbnRleHQtbWVudS1pdGVtL2NvbnRleHQtbWVudS1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7SUFrQjdELGtDQUFvQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtLQUFLOzs7O0lBRWhELDJDQUFROzs7SUFBUjtLQUNDOzs7OztJQU1NLHNDQUFHOzs7OztRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7O2dCQTVCeEIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSw2UEFPWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2I7Ozs7Z0JBYk8sY0FBYzs7O3VCQWdCbkIsS0FBSzs7bUNBbEJSOztTQWdCYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udGV4dE1lbnVJdGVtfSBmcm9tICcuLi8uLi90eXBlcy9jb250ZXh0LW1lbnUtaXRlbSc7XHJcbmltcG9ydCB7Q29udGV4clNlcnZpY2V9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9jb250ZXhyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjdHgtY29udGV4dC1tZW51LWl0ZW0nLFxyXG4gIHRlbXBsYXRlOiBgPGxpIChjbGljayk9XCJhY3QoKVwiIGNsYXNzPVwiY29udGV4dC1saXN0LWl0ZW1cIj5cclxuICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwiY29udGV4dFwiPnt7aXRlbS50ZXh0fX08L3NwYW4+XHJcbiAgICA8c3BhbiBzdHlsZT1cImZsZXg6IDEgMSBhdXRvO1wiPjwvc3Bhbj5cclxuICAgIDxzcGFuIGNsYXNzPVwic2hvcnRjdXRcIj57e2l0ZW0uaG90a2V5fX08L3NwYW4+XHJcbiAgPC9kaXY+XHJcbjwvbGk+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSBpdGVtOiBDb250ZXh0TWVudUl0ZW07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4cjogQ29udGV4clNlcnZpY2UpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGwgYW4gYWN0aW9uIGFuZCBjbG9zZSB0aGUgY29udGV4dCBtZW51XHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBwdWJsaWMgYWN0KCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2codGhpcy5pdGVtKTtcclxuICAgIHRoaXMuaXRlbS5hY3Rpb24odGhpcy5pdGVtLmFyZ3MpO1xyXG4gICAgdGhpcy5jb250ZXhyLmNsb3NlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==