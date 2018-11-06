/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ContextMenuItem } from '../../types/context-menu-item';
import { ContexrService } from '../../providers/contexr.service';
export class ContextMenuItemComponent {
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
    { type: ContexrService }
];
ContextMenuItemComponent.propDecorators = {
    item: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ContextMenuItemComponent.prototype.item;
    /** @type {?} */
    ContextMenuItemComponent.prototype.contexr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29udGV4ci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2NvbnRleHQtbWVudS1pdGVtL2NvbnRleHQtbWVudS1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQWMvRCxNQUFNOzs7O0lBSUosWUFBb0IsT0FBdUI7UUFBdkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7S0FBSzs7OztJQUVoRCxRQUFRO0tBQ1A7Ozs7O0lBTU0sR0FBRztRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7OztZQTVCeEIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7OztDQU9YO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7O1lBYk8sY0FBYzs7O21CQWdCbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250ZXh0TWVudUl0ZW19IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtbWVudS1pdGVtJztcclxuaW1wb3J0IHtDb250ZXhyU2VydmljZX0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2NvbnRleHIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2N0eC1jb250ZXh0LW1lbnUtaXRlbScsXHJcbiAgdGVtcGxhdGU6IGA8bGkgKGNsaWNrKT1cImFjdCgpXCIgY2xhc3M9XCJjb250ZXh0LWxpc3QtaXRlbVwiPlxyXG4gIDxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lclwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJjb250ZXh0XCI+e3tpdGVtLnRleHR9fTwvc3Bhbj5cclxuICAgIDxzcGFuIHN0eWxlPVwiZmxleDogMSAxIGF1dG87XCI+PC9zcGFuPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJzaG9ydGN1dFwiPnt7aXRlbS5ob3RrZXl9fTwvc3Bhbj5cclxuICA8L2Rpdj5cclxuPC9saT5cclxuYCxcclxuICBzdHlsZXM6IFtgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIEBJbnB1dCgpIGl0ZW06IENvbnRleHRNZW51SXRlbTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250ZXhyOiBDb250ZXhyU2VydmljZSkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbCBhbiBhY3Rpb24gYW5kIGNsb3NlIHRoZSBjb250ZXh0IG1lbnVcclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhY3QoKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLml0ZW0pO1xyXG4gICAgdGhpcy5pdGVtLmFjdGlvbih0aGlzLml0ZW0uYXJncyk7XHJcbiAgICB0aGlzLmNvbnRleHIuY2xvc2UoKTtcclxuICB9XHJcbn1cclxuIl19