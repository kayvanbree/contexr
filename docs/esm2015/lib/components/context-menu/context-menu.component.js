/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, HostListener } from '@angular/core';
import { ContexrService } from '../../providers/contexr.service';
export class ContextMenuComponent {
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
    { type: ContexrService }
];
ContextMenuComponent.propDecorators = {
    onDocumentClick: [{ type: HostListener, args: ['document:click',] }],
    onDocumentContextMenu: [{ type: HostListener, args: ['document:contextmenu', ['$event'],] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NvbnRleHIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBRXpFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQXdCL0QsTUFBTTs7OztJQU1KLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO29CQUw1QixLQUFLOztRQU9qQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDakQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3RCLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDVjs7Ozs7SUFNRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7O0lBTUQsYUFBYSxDQUFDLEtBQUs7UUFDakIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3pCOzs7Ozs7SUFNRCxPQUFPLENBQUMsS0FBSztRQUNYLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7O0lBT0QscUJBQXFCLENBQUMsS0FBSztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBS00sUUFBUTtRQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN4RSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztTQUN6QyxDQUFDLENBQUM7Ozs7OztJQU1FLFdBQVc7UUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7OztJQVE5QixRQUFRLENBQUMsSUFBc0I7UUFDcEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQkFBQyxJQUF1QixFQUFDLENBQUMsTUFBTSxDQUFDOzs7O1lBM0Y3QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztDQWNYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLDZ1QkFBNnVCLENBQUM7YUFDeHZCOzs7O1lBdkJPLGNBQWM7Ozs4QkEwQ25CLFlBQVksU0FBQyxnQkFBZ0I7b0NBeUI3QixZQUFZLFNBQUMsc0JBQXNCLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udGV4dFN0YXRlfSBmcm9tICcuLi8uLi90eXBlcy9jb250ZXh0LXN0YXRlJztcclxuaW1wb3J0IHtDb250ZXhyU2VydmljZX0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2NvbnRleHIuc2VydmljZSc7XHJcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtDb250ZXh0TWVudUl0ZW19IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtbWVudS1pdGVtJztcclxuaW1wb3J0IHtDb250ZXh0TWVudUVudHJ5fSBmcm9tICcuLi8uLi90eXBlcy9jb250ZXh0LW1lbnUtZW50cnknO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjdHgtY29udGV4dC1tZW51JyxcclxuICB0ZW1wbGF0ZTogYDxkaXZcbiAgKGNvbnRleHRtZW51KT1cIm9uQ29udGV4dE1lbnUoJGV2ZW50KVwiXG4gIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxuICAqbmdJZj1cIm9wZW5cIlxuICBjbGFzcz1cImNvbnRleHQtbWVudSBtZW51XCJcbiAgW25nU3R5bGVdPVwieyd0b3AucHgnOiBjb250ZXh0U3RhdGUudG9wLCAnbGVmdC5weCc6IGNvbnRleHRTdGF0ZS5sZWZ0fVwiXG4+XG4gIDx1bCBjbGFzcz1cImNvbnRleHQtbGlzdFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgY29udGV4dFN0YXRlLmNvbnRleHRcIj5cbiAgICAgIDxjdHgtY29udGV4dC1tZW51LWl0ZW0gKm5nSWY9XCJpc0FjdGlvbihpdGVtKVwiIFtpdGVtXT1cIml0ZW1cIj48L2N0eC1jb250ZXh0LW1lbnUtaXRlbT5cbiAgICAgIDxjdHgtc3VibWVudSAqbmdJZj1cIiFpc0FjdGlvbihpdGVtKVwiIFtpdGVtXT1cIml0ZW1cIj48L2N0eC1zdWJtZW51PlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L3VsPlxuPC9kaXY+XG5gLFxyXG4gIHN0eWxlczogW2AuY29udGV4dC1tZW51e3Bvc2l0aW9uOmFic29sdXRlfTo6bmctZGVlcCAubWVudXtiYWNrZ3JvdW5kOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjYTdhN2E3O2JveC1zaGFkb3c6MCAwIDEwcHggMCByZ2JhKDAsMCwwLC41KX06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdHttYXJnaW46MDtwYWRkaW5nOjB9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVte2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nOjVweCA3cHg7bWluLXdpZHRoOjIwMHB4O2N1cnNvcjpwb2ludGVyfTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbSAuZmxleC1jb250YWluZXJ7ZGlzcGxheTpmbGV4fTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbSAuc2hvcnRjdXR7Zm9udC1zaXplOi44ZW07b3BhY2l0eTouNTttYXJnaW4tbGVmdDoxMHB4O21hcmdpbi10b3A6MnB4fTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbSAuc3VibWVudXtkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luLXRvcDotMjBweH06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdCAuY29udGV4dC1saXN0LWl0ZW06aG92ZXJ7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4xKX06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdCAuY29udGV4dC1saXN0LWl0ZW06aG92ZXI+LnN1Ym1lbnV7ZGlzcGxheTpibG9ja31gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHVibGljIG9wZW4gPSBmYWxzZTtcclxuICBwdWJsaWMgY29udGV4dFN0YXRlOiBDb250ZXh0U3RhdGU7XHJcblxyXG4gIHByaXZhdGUgY29udGV4dFN0YXRlU3ViOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZXhyOiBDb250ZXhyU2VydmljZSkge1xyXG4gICAgLy8gRXZlbnQgY2FwdHVyaW5nIChub3QgcG9zc2libGUgaW4gcmVhbCBBbmd1bGFyIHlldClcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdSZXNldCBjb250ZXh0IG1lbnUgYW5kIHByZXZlbnQgZGVmYXVsdCcpO1xyXG4gICAgICB0aGlzLmNvbnRleHIucmVzZXQoKTtcclxuICAgIH0sIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2UgdGhlIGNvbnRleHQgbWVudSB3aGVuIHdlIGNsaWNrIHNvbWV3aGVyZSBlbHNlXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snKVxyXG4gIG9uRG9jdW1lbnRDbGljaygpOiB2b2lkIHtcclxuICAgIHRoaXMuY29udGV4ci5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJldmVudCBhIHJpZ2h0IGNsaWNrIGZyb20gdGhlIGNvbnRleHQgbWVudSB0byBwcm9wYWdhdGUgZnVydGhlclxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIG9uQ29udGV4dE1lbnUoZXZlbnQpOiB2b2lkIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJldmVudCBhIGNsaWNrIGZyb20gdGhlIGNvbnRleHQgbWVudSB0byBwcm9wYWdhdGUgZnVydGhlclxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIG9uQ2xpY2soZXZlbnQpOiB2b2lkIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBjb250ZXh0IG1lbnUgZm9yIG91ciBjb250ZXh0IG9yIGZvciBhbGxcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXHJcbiAgb25Eb2N1bWVudENvbnRleHRNZW51KGV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnT3BlbiBjb250ZXh0IG1lbnUnKTtcclxuICAgIHRoaXMuY29udGV4ci5vcGVuKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byB0aGUgY29udGV4dCBtZW51IHN0YXRlXHJcbiAgICovXHJcbiAgcHVibGljIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jb250ZXh0U3RhdGVTdWIgPSB0aGlzLmNvbnRleHIuZ2V0Q29udGV4dFN0YXRlKCkuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICB0aGlzLmNvbnRleHRTdGF0ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLm9wZW4gPSAhIXRoaXMuY29udGV4dFN0YXRlLmNvbnRleHQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3ViIGZyb20gdGhlIGNvbnRleHQgbWVudSBzdGF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkICB7XHJcbiAgICB0aGlzLmNvbnRleHRTdGF0ZVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgdGhpcyBpcyBhbiBhY3Rpb25cclxuICAgKiBAcGFyYW0gaXRlbVxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgcHVibGljIGlzQWN0aW9uKGl0ZW06IENvbnRleHRNZW51RW50cnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhIShpdGVtIGFzIENvbnRleHRNZW51SXRlbSkuYWN0aW9uO1xyXG4gIH1cclxufVxyXG4iXX0=