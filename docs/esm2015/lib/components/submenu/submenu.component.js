/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input } from '@angular/core';
import { Submenu } from '../../types/submenu';
export class SubmenuComponent {
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
if (false) {
    /** @type {?} */
    SubmenuComponent.prototype.item;
    /** @type {?} */
    SubmenuComponent.prototype.subMenuStyle;
    /** @type {?} */
    SubmenuComponent.prototype.element;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb250ZXhyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc3VibWVudS9zdWJtZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQXFCNUMsTUFBTTs7OztJQUlKLFlBQW9CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7NEJBRWpCLEVBQUU7S0FGb0I7Ozs7SUFJckMsV0FBVzs7UUFDaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxHQUFHO1lBQ2xCLE1BQU0sRUFBRSxHQUFHLEdBQUcsSUFBSTtZQUNsQixLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJO1NBQ2hDLENBQUM7Ozs7Ozs7SUFRRyxRQUFRLENBQUMsSUFBc0I7UUFDcEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQkFBQyxJQUF1QixFQUFDLENBQUMsTUFBTSxDQUFDOzs7O1lBeEM3QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztDQWFYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7O1lBdEJrQixVQUFVOzs7bUJBeUIxQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250ZXh0TWVudUl0ZW19IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtbWVudS1pdGVtJztcbmltcG9ydCB7U3VibWVudX0gZnJvbSAnLi4vLi4vdHlwZXMvc3VibWVudSc7XG5pbXBvcnQge0NvbnRleHRNZW51RW50cnl9IGZyb20gJy4uLy4uL3R5cGVzL2NvbnRleHQtbWVudS1lbnRyeSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N0eC1zdWJtZW51JyxcbiAgdGVtcGxhdGU6IGA8bGkgY2xhc3M9XCJjb250ZXh0LWxpc3QtaXRlbVwiPlxuICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICA8c3BhbiBjbGFzcz1cImNvbnRleHRcIj57e2l0ZW0udGV4dH19PC9zcGFuPlxuICAgIDxzcGFuIHN0eWxlPVwiZmxleDogMSAxIGF1dG87XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwic2hvcnRjdXRcIj4+Pj48L3NwYW4+XG4gIDwvZGl2PlxuICA8dWwgY2xhc3M9XCJjb250ZXh0LWxpc3Qgc3VibWVudSBtZW51XCIgW25nU3R5bGVdPVwic3ViTWVudVN0eWxlXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgc3ViSXRlbSBvZiBpdGVtLmNoaWxkcmVuXCI+XG4gICAgICA8Y3R4LWNvbnRleHQtbWVudS1pdGVtICpuZ0lmPVwiaXNBY3Rpb24oc3ViSXRlbSlcIiBbaXRlbV09XCJzdWJJdGVtXCI+PC9jdHgtY29udGV4dC1tZW51LWl0ZW0+XG4gICAgICA8Y3R4LXN1Ym1lbnUgKm5nSWY9XCIhaXNBY3Rpb24oc3ViSXRlbSlcIiBbaXRlbV09XCJzdWJJdGVtXCI+PC9jdHgtc3VibWVudT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC91bD5cbjwvbGk+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgU3VibWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgaXRlbTogU3VibWVudTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIHB1YmxpYyBzdWJNZW51U3R5bGUgPSB7fTtcblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMuc3ViTWVudVN0eWxlID0ge1xuICAgICAgJ2xlZnQnOiAyMTQgKyAncHgnLFxuICAgICAgJ3RvcCc6IHJlY3Qub2Zmc2V0SGVpZ2h0ICsgJ3B4J1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhpcyBpcyBhbiBhY3Rpb25cbiAgICogQHBhcmFtIGl0ZW1cbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBpc0FjdGlvbihpdGVtOiBDb250ZXh0TWVudUVudHJ5KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKGl0ZW0gYXMgQ29udGV4dE1lbnVJdGVtKS5hY3Rpb247XG4gIH1cbn1cbiJdfQ==