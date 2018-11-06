/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input } from '@angular/core';
import { ContexrService } from 'contexr/lib/providers/contexr.service';
var ContextDirective = /** @class */ (function () {
    function ContextDirective(contexr) {
        this.contexr = contexr;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ContextDirective.prototype.onContextMenu = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        console.log('Adding context: ' + this.ctx + ' with args: ' + this.ctxArgs);
        this.contexr.addCurrentContext(this.ctx, this.ctxArgs);
    };
    ContextDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ctx]'
                },] },
    ];
    /** @nocollapse */
    ContextDirective.ctorParameters = function () { return [
        { type: ContexrService }
    ]; };
    ContextDirective.propDecorators = {
        ctx: [{ type: Input, args: ['ctx',] }],
        ctxArgs: [{ type: Input, args: ['ctxArgs',] }],
        onContextMenu: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
    };
    return ContextDirective;
}());
export { ContextDirective };
if (false) {
    /** @type {?} */
    ContextDirective.prototype.ctx;
    /** @type {?} */
    ContextDirective.prototype.ctxArgs;
    /** @type {?} */
    ContextDirective.prototype.contexr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb250ZXhyLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvY29udGV4dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUNBQXVDLENBQUM7O0lBU25FLDBCQUFvQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtLQUFJOzs7OztJQUd4Qyx3Q0FBYTs7OztJQURwQixVQUNxQixLQUFLO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDeEQ7O2dCQWJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsT0FBTztpQkFDbEI7Ozs7Z0JBSk8sY0FBYzs7O3NCQU1uQixLQUFLLFNBQUMsS0FBSzswQkFDWCxLQUFLLFNBQUMsU0FBUztnQ0FJZixZQUFZLFNBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDOzsyQkFaekM7O1NBTWEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRleHJTZXJ2aWNlfSBmcm9tICdjb250ZXhyL2xpYi9wcm92aWRlcnMvY29udGV4ci5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2N0eF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0RGlyZWN0aXZlIHtcclxuICBASW5wdXQoJ2N0eCcpIGN0eDogc3RyaW5nO1xyXG4gIEBJbnB1dCgnY3R4QXJncycpIGN0eEFyZ3M6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250ZXhyOiBDb250ZXhyU2VydmljZSkge31cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY29udGV4dG1lbnUnLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvbkNvbnRleHRNZW51KGV2ZW50KSB7XHJcbiAgICBjb25zb2xlLmxvZygnQWRkaW5nIGNvbnRleHQ6ICcgKyB0aGlzLmN0eCArICcgd2l0aCBhcmdzOiAnICsgdGhpcy5jdHhBcmdzKTtcclxuICAgIHRoaXMuY29udGV4ci5hZGRDdXJyZW50Q29udGV4dCh0aGlzLmN0eCwgdGhpcy5jdHhBcmdzKTtcclxuICB9XHJcbn1cclxuIl19