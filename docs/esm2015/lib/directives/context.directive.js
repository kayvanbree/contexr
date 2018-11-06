/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input } from '@angular/core';
import { ContexrService } from 'contexr/lib/providers/contexr.service';
export class ContextDirective {
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
if (false) {
    /** @type {?} */
    ContextDirective.prototype.ctx;
    /** @type {?} */
    ContextDirective.prototype.ctxArgs;
    /** @type {?} */
    ContextDirective.prototype.contexr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb250ZXhyLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvY29udGV4dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFLckUsTUFBTTs7OztJQUlKLFlBQW9CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO0tBQUk7Ozs7O0lBR3hDLGFBQWEsQ0FBQyxLQUFLO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDeEQ7OztZQWJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsT0FBTzthQUNsQjs7OztZQUpPLGNBQWM7OztrQkFNbkIsS0FBSyxTQUFDLEtBQUs7c0JBQ1gsS0FBSyxTQUFDLFNBQVM7NEJBSWYsWUFBWSxTQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250ZXhyU2VydmljZX0gZnJvbSAnY29udGV4ci9saWIvcHJvdmlkZXJzL2NvbnRleHIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tjdHhdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dERpcmVjdGl2ZSB7XHJcbiAgQElucHV0KCdjdHgnKSBjdHg6IHN0cmluZztcclxuICBASW5wdXQoJ2N0eEFyZ3MnKSBjdHhBcmdzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4cjogQ29udGV4clNlcnZpY2UpIHt9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25Db250ZXh0TWVudShldmVudCkge1xyXG4gICAgY29uc29sZS5sb2coJ0FkZGluZyBjb250ZXh0OiAnICsgdGhpcy5jdHggKyAnIHdpdGggYXJnczogJyArIHRoaXMuY3R4QXJncyk7XHJcbiAgICB0aGlzLmNvbnRleHIuYWRkQ3VycmVudENvbnRleHQodGhpcy5jdHgsIHRoaXMuY3R4QXJncyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==