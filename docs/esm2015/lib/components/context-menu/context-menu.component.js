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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NvbnRleHIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBRXpFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQXdCL0QsTUFBTTs7OztJQU1KLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO29CQUw1QixLQUFLOztRQU9qQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDakQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3RCLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDVjs7Ozs7SUFNRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7O0lBTUQsYUFBYSxDQUFDLEtBQUs7UUFDakIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3pCOzs7Ozs7SUFNRCxPQUFPLENBQUMsS0FBSztRQUNYLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7O0lBT0QscUJBQXFCLENBQUMsS0FBSztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBS00sUUFBUTtRQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN4RSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztTQUN6QyxDQUFDLENBQUM7Ozs7OztJQU1FLFdBQVc7UUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7OztJQVE5QixRQUFRLENBQUMsSUFBc0I7UUFDcEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQkFBQyxJQUF1QixFQUFDLENBQUMsTUFBTSxDQUFDOzs7O1lBM0Y3QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztDQWNYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLDZ1QkFBNnVCLENBQUM7YUFDeHZCOzs7O1lBdkJPLGNBQWM7Ozs4QkEwQ25CLFlBQVksU0FBQyxnQkFBZ0I7b0NBeUI3QixZQUFZLFNBQUMsc0JBQXNCLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udGV4dFN0YXRlfSBmcm9tICcuLi8uLi90eXBlcy9jb250ZXh0LXN0YXRlJztcclxuaW1wb3J0IHtDb250ZXhyU2VydmljZX0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2NvbnRleHIuc2VydmljZSc7XHJcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtDb250ZXh0TWVudUl0ZW19IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtbWVudS1pdGVtJztcclxuaW1wb3J0IHtDb250ZXh0TWVudUVudHJ5fSBmcm9tICcuLi8uLi90eXBlcy9jb250ZXh0LW1lbnUtZW50cnknO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjdHgtY29udGV4dC1tZW51JyxcclxuICB0ZW1wbGF0ZTogYDxkaXZcclxuICAoY29udGV4dG1lbnUpPVwib25Db250ZXh0TWVudSgkZXZlbnQpXCJcclxuICAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCJcclxuICAqbmdJZj1cIm9wZW5cIlxyXG4gIGNsYXNzPVwiY29udGV4dC1tZW51IG1lbnVcIlxyXG4gIFtuZ1N0eWxlXT1cInsndG9wLnB4JzogY29udGV4dFN0YXRlLnRvcCwgJ2xlZnQucHgnOiBjb250ZXh0U3RhdGUubGVmdH1cIlxyXG4+XHJcbiAgPHVsIGNsYXNzPVwiY29udGV4dC1saXN0XCI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGNvbnRleHRTdGF0ZS5jb250ZXh0XCI+XHJcbiAgICAgIDxjdHgtY29udGV4dC1tZW51LWl0ZW0gKm5nSWY9XCJpc0FjdGlvbihpdGVtKVwiIFtpdGVtXT1cIml0ZW1cIj48L2N0eC1jb250ZXh0LW1lbnUtaXRlbT5cclxuICAgICAgPGN0eC1zdWJtZW51ICpuZ0lmPVwiIWlzQWN0aW9uKGl0ZW0pXCIgW2l0ZW1dPVwiaXRlbVwiPjwvY3R4LXN1Ym1lbnU+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICA8L3VsPlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLmNvbnRleHQtbWVudXtwb3NpdGlvbjphYnNvbHV0ZX06Om5nLWRlZXAgLm1lbnV7YmFja2dyb3VuZDojZmZmO2JvcmRlcjoxcHggc29saWQgI2E3YTdhNztib3gtc2hhZG93OjAgMCAxMHB4IDAgcmdiYSgwLDAsMCwuNSl9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3R7bWFyZ2luOjA7cGFkZGluZzowfTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbXtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZzo1cHggN3B4O21pbi13aWR0aDoyMDBweDtjdXJzb3I6cG9pbnRlcn06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdCAuY29udGV4dC1saXN0LWl0ZW0gLmZsZXgtY29udGFpbmVye2Rpc3BsYXk6ZmxleH06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdCAuY29udGV4dC1saXN0LWl0ZW0gLnNob3J0Y3V0e2ZvbnQtc2l6ZTouOGVtO29wYWNpdHk6LjU7bWFyZ2luLWxlZnQ6MTBweDttYXJnaW4tdG9wOjJweH06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdCAuY29udGV4dC1saXN0LWl0ZW0gLnN1Ym1lbnV7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbi10b3A6LTIwcHh9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVtOmhvdmVye2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMSl9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVtOmhvdmVyPi5zdWJtZW51e2Rpc3BsYXk6YmxvY2t9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHB1YmxpYyBvcGVuID0gZmFsc2U7XHJcbiAgcHVibGljIGNvbnRleHRTdGF0ZTogQ29udGV4dFN0YXRlO1xyXG5cclxuICBwcml2YXRlIGNvbnRleHRTdGF0ZVN1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udGV4cjogQ29udGV4clNlcnZpY2UpIHtcclxuICAgIC8vIEV2ZW50IGNhcHR1cmluZyAobm90IHBvc3NpYmxlIGluIHJlYWwgQW5ndWxhciB5ZXQpXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zb2xlLmxvZygnUmVzZXQgY29udGV4dCBtZW51IGFuZCBwcmV2ZW50IGRlZmF1bHQnKTtcclxuICAgICAgdGhpcy5jb250ZXhyLnJlc2V0KCk7XHJcbiAgICB9LCB0cnVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlIHRoZSBjb250ZXh0IG1lbnUgd2hlbiB3ZSBjbGljayBzb21ld2hlcmUgZWxzZVxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJylcclxuICBvbkRvY3VtZW50Q2xpY2soKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbnRleHIuY2xvc2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByZXZlbnQgYSByaWdodCBjbGljayBmcm9tIHRoZSBjb250ZXh0IG1lbnUgdG8gcHJvcGFnYXRlIGZ1cnRoZXJcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBvbkNvbnRleHRNZW51KGV2ZW50KTogdm9pZCB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByZXZlbnQgYSBjbGljayBmcm9tIHRoZSBjb250ZXh0IG1lbnUgdG8gcHJvcGFnYXRlIGZ1cnRoZXJcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBvbkNsaWNrKGV2ZW50KTogdm9pZCB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgY29udGV4dCBtZW51IGZvciBvdXIgY29udGV4dCBvciBmb3IgYWxsXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y29udGV4dG1lbnUnLCBbJyRldmVudCddKVxyXG4gIG9uRG9jdW1lbnRDb250ZXh0TWVudShldmVudCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ09wZW4gY29udGV4dCBtZW51Jyk7XHJcbiAgICB0aGlzLmNvbnRleHIub3BlbihldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNvbnRleHQgbWVudSBzdGF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuY29udGV4dFN0YXRlU3ViID0gdGhpcy5jb250ZXhyLmdldENvbnRleHRTdGF0ZSgpLnN1YnNjcmliZSgodmFsdWUpID0+IHtcclxuICAgICAgdGhpcy5jb250ZXh0U3RhdGUgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5vcGVuID0gISF0aGlzLmNvbnRleHRTdGF0ZS5jb250ZXh0O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YiBmcm9tIHRoZSBjb250ZXh0IG1lbnUgc3RhdGVcclxuICAgKi9cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCAge1xyXG4gICAgdGhpcy5jb250ZXh0U3RhdGVTdWIudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIHRoaXMgaXMgYW4gYWN0aW9uXHJcbiAgICogQHBhcmFtIGl0ZW1cclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBpc0FjdGlvbihpdGVtOiBDb250ZXh0TWVudUVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gISEoaXRlbSBhcyBDb250ZXh0TWVudUl0ZW0pLmFjdGlvbjtcclxuICB9XHJcbn1cclxuIl19