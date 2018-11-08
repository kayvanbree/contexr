(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('angular2-hotkeys'), require('angular2-hotkeys/src/hotkeys.service'), require('contexr/lib/providers/contexr.service'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('contexr', ['exports', '@angular/core', 'rxjs', 'angular2-hotkeys', 'angular2-hotkeys/src/hotkeys.service', 'contexr/lib/providers/contexr.service', '@angular/common'], factory) :
    (factory((global.contexr = {}),global.ng.core,global.rxjs,null,null,null,global.ng.common));
}(this, (function (exports,i0,rxjs,angular2Hotkeys,i1,contexr_service,common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ContextMenuEntry = (function () {
        function ContextMenuEntry() {
        }
        return ContextMenuEntry;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ContextMenuItem = (function (_super) {
        __extends(ContextMenuItem, _super);
        function ContextMenuItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ContextMenuItem;
    }(ContextMenuEntry));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ContexrService = (function () {
        function ContexrService(hotkeysService) {
            this.hotkeysService = hotkeysService;
            this.context = [];
            this.currentContext = [];
            this.contextStateSubject = new rxjs.Subject();
            this.contextStateObservable = this.contextStateSubject.asObservable();
        }
        /**
         * Reset the current context
         * @return {?}
         */
        ContexrService.prototype.reset = /**
         * Reset the current context
         * @return {?}
         */
            function () {
                this.currentContext = [];
            };
        /**
         * Add a context
         * @param {?} context
         * @param {?} args
         * @return {?}
         */
        ContexrService.prototype.addCurrentContext = /**
         * Add a context
         * @param {?} context
         * @param {?} args
         * @return {?}
         */
            function (context, args) {
                this.addItemsInContext(this.context, context, args);
            };
        /**
         * Register a context menu person to show up at some context
         * @param {?} context
         * @return {?}
         */
        ContexrService.prototype.registerContextMenuItem = /**
         * Register a context menu person to show up at some context
         * @param {?} context
         * @return {?}
         */
            function (context) {
                this.context.push(context);
                if (((context)).hotkey && ((context)).hotkey) {
                    this.hotkeysService.add(new angular2Hotkeys.Hotkey(((context)).hotkey, function (event) {
                        ((context)).action();
                        return false;
                    }));
                }
            };
        /**
         * Register an array of context menu items
         * @param {?} context
         * @return {?}
         */
        ContexrService.prototype.registerContextMenuItems = /**
         * Register an array of context menu items
         * @param {?} context
         * @return {?}
         */
            function (context) {
                for (var i = 0; i < context.length; i++) {
                    this.registerContextMenuItem(context[i]);
                }
            };
        /**
         * Returns the state of the context menu
         * @return {?}
         */
        ContexrService.prototype.getContextState = /**
         * Returns the state of the context menu
         * @return {?}
         */
            function () {
                return this.contextStateObservable;
            };
        /**
         * Open the context menu
         * @param {?} event
         * @return {?}
         */
        ContexrService.prototype.open = /**
         * Open the context menu
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.addItemsInContext(this.context, 'all', null);
                this.contextStateSubject.next({
                    open: true,
                    context: this.currentContext,
                    top: event.clientY + window.pageYOffset,
                    left: event.clientX
                });
            };
        /**
         * Filter all context items with our context string
         * @param {?} items
         * @param {?} context
         * @param {?} args
         * @return {?}
         */
        ContexrService.prototype.addItemsInContext = /**
         * Filter all context items with our context string
         * @param {?} items
         * @param {?} context
         * @param {?} args
         * @return {?}
         */
            function (items, context, args) {
                for (var i = 0; i < items.length; i++) {
                    if (((items[i])).action) {
                        /** @type {?} */
                        var action = (Object.assign({}, items[i]));
                        if (args !== null) {
                            action.args = args;
                        }
                        if (action.context.indexOf(context) !== -1) {
                            this.currentContext.push(action);
                        }
                    }
                    else if (((items[i])).children) {
                        /** @type {?} */
                        var submenu = (Object.assign({}, items[i]));
                        this.addItemsInContext(((items[i])).children, context, args);
                        if (submenu.children.length > 0) {
                            this.currentContext.push(submenu);
                        }
                    }
                }
            };
        /**
         * Close the context menu
         * @return {?}
         */
        ContexrService.prototype.close = /**
         * Close the context menu
         * @return {?}
         */
            function () {
                this.contextStateSubject.next({
                    open: false
                });
            };
        ContexrService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        ContexrService.ctorParameters = function () {
            return [
                { type: angular2Hotkeys.HotkeysService }
            ];
        };
        /** @nocollapse */ ContexrService.ngInjectableDef = i0.defineInjectable({ factory: function ContexrService_Factory() { return new ContexrService(i0.inject(i1.HotkeysService)); }, token: ContexrService, providedIn: "root" });
        return ContexrService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ContextMenuComponent = (function () {
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
                return !!((item)).action;
            };
        ContextMenuComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ctx-context-menu',
                        template: "<div\n  (contextmenu)=\"onContextMenu($event)\"\n  (click)=\"onClick($event)\"\n  *ngIf=\"open\"\n  class=\"context-menu menu\"\n  [ngStyle]=\"{'top.px': contextState.top, 'left.px': contextState.left}\"\n>\n  <ul class=\"context-list\">\n    <ng-container *ngFor=\"let item of contextState.context\">\n      <ctx-context-menu-item *ngIf=\"isAction(item)\" [item]=\"item\"></ctx-context-menu-item>\n      <ctx-submenu *ngIf=\"!isAction(item)\" [item]=\"item\"></ctx-submenu>\n    </ng-container>\n  </ul>\n</div>\n",
                        styles: [".context-menu{position:absolute}::ng-deep .menu{background:#fff;border:1px solid #a7a7a7;box-shadow:0 0 10px 0 rgba(0,0,0,.5)}::ng-deep .menu .context-list{margin:0;padding:0}::ng-deep .menu .context-list .context-list-item{list-style:none;padding:5px 7px;min-width:200px;cursor:pointer}::ng-deep .menu .context-list .context-list-item .flex-container{display:flex}::ng-deep .menu .context-list .context-list-item .shortcut{font-size:.8em;opacity:.5;margin-left:10px;margin-top:2px}::ng-deep .menu .context-list .context-list-item .submenu{display:none;position:absolute;margin-top:-20px}::ng-deep .menu .context-list .context-list-item:hover{background:rgba(0,0,0,.1)}::ng-deep .menu .context-list .context-list-item:hover>.submenu{display:block}"]
                    },] },
        ];
        /** @nocollapse */
        ContextMenuComponent.ctorParameters = function () {
            return [
                { type: ContexrService }
            ];
        };
        ContextMenuComponent.propDecorators = {
            onDocumentClick: [{ type: i0.HostListener, args: ['document:click',] }],
            onDocumentContextMenu: [{ type: i0.HostListener, args: ['document:contextmenu', ['$event'],] }]
        };
        return ContextMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SubmenuComponent = (function () {
        function SubmenuComponent(element) {
            this.element = element;
            this.subMenuStyle = {};
        }
        /**
         * @return {?}
         */
        SubmenuComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var rect = this.element.nativeElement.getBoundingClientRect();
                this.subMenuStyle = {
                    'left': 214 + 'px',
                    'top': rect.offsetHeight + 'px'
                };
            };
        /**
         * Check if this is an action
         * @param {?} item
         * @return {?}
         */
        SubmenuComponent.prototype.isAction = /**
         * Check if this is an action
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return !!((item)).action;
            };
        SubmenuComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ctx-submenu',
                        template: "<li class=\"context-list-item\">\n  <div class=\"flex-container\">\n    <span class=\"context\">{{item.text}}</span>\n    <span style=\"flex: 1 1 auto;\"></span>\n    <span class=\"shortcut\">>>></span>\n  </div>\n  <ul class=\"context-list submenu menu\" [ngStyle]=\"subMenuStyle\">\n    <ng-container *ngFor=\"let subItem of item.children\">\n      <ctx-context-menu-item *ngIf=\"isAction(subItem)\" [item]=\"subItem\"></ctx-context-menu-item>\n      <ctx-submenu *ngIf=\"!isAction(subItem)\" [item]=\"subItem\"></ctx-submenu>\n    </ng-container>\n  </ul>\n</li>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        SubmenuComponent.ctorParameters = function () {
            return [
                { type: i0.ElementRef }
            ];
        };
        SubmenuComponent.propDecorators = {
            item: [{ type: i0.Input }]
        };
        return SubmenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ContextMenuItemComponent = (function () {
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
            { type: i0.Component, args: [{
                        selector: 'ctx-context-menu-item',
                        template: "<li (click)=\"act()\" class=\"context-list-item\">\n  <div class=\"flex-container\">\n    <span class=\"context\">{{item.text}}</span>\n    <span style=\"flex: 1 1 auto;\"></span>\n    <span class=\"shortcut\">{{item.hotkey}}</span>\n  </div>\n</li>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        ContextMenuItemComponent.ctorParameters = function () {
            return [
                { type: ContexrService }
            ];
        };
        ContextMenuItemComponent.propDecorators = {
            item: [{ type: i0.Input }]
        };
        return ContextMenuItemComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ContextDirective = (function () {
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
            { type: i0.Directive, args: [{
                        selector: '[ctx]'
                    },] },
        ];
        /** @nocollapse */
        ContextDirective.ctorParameters = function () {
            return [
                { type: contexr_service.ContexrService }
            ];
        };
        ContextDirective.propDecorators = {
            ctx: [{ type: i0.Input, args: ['ctx',] }],
            ctxArgs: [{ type: i0.Input, args: ['ctxArgs',] }],
            onContextMenu: [{ type: i0.HostListener, args: ['contextmenu', ['$event'],] }]
        };
        return ContextDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ContexrModule = (function () {
        function ContexrModule() {
        }
        ContexrModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            angular2Hotkeys.HotkeyModule.forRoot()
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
                            ContexrService
                        ]
                    },] },
        ];
        return ContexrModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.ContextMenuItem = ContextMenuItem;
    exports.ContextMenuComponent = ContextMenuComponent;
    exports.ContexrModule = ContexrModule;
    exports.ɵd = ContextMenuItemComponent;
    exports.ɵc = SubmenuComponent;
    exports.ɵe = ContextDirective;
    exports.ɵb = ContexrService;
    exports.ɵa = ContextMenuEntry;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4ci51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vY29udGV4ci9saWIvdHlwZXMvY29udGV4dC1tZW51LWVudHJ5LnRzIiwibmc6Ly9jb250ZXhyL2xpYi90eXBlcy9jb250ZXh0LW1lbnUtaXRlbS50cyIsIm5nOi8vY29udGV4ci9saWIvcHJvdmlkZXJzL2NvbnRleHIuc2VydmljZS50cyIsIm5nOi8vY29udGV4ci9saWIvY29tcG9uZW50cy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vY29udGV4ci9saWIvY29tcG9uZW50cy9zdWJtZW51L3N1Ym1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9jb250ZXhyL2xpYi9jb21wb25lbnRzL2NvbnRleHQtbWVudS1pdGVtL2NvbnRleHQtbWVudS1pdGVtLmNvbXBvbmVudC50cyIsIm5nOi8vY29udGV4ci9saWIvZGlyZWN0aXZlcy9jb250ZXh0LmRpcmVjdGl2ZS50cyIsIm5nOi8vY29udGV4ci9saWIvY29udGV4ci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgQ29udGV4dE1lbnVFbnRyeSB7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7Q29udGV4dE1lbnVFbnRyeX0gZnJvbSAnLi9jb250ZXh0LW1lbnUtZW50cnknO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51SXRlbSBleHRlbmRzIENvbnRleHRNZW51RW50cnkge1xyXG4gIGNvbnRleHQ6IHN0cmluZ1tdO1xyXG4gIGFjdGlvbjogKGFyZ3M6IGFueSkgPT4gdm9pZDtcclxuICBob3RrZXk/OiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBhcmdzPzogYW55O1xyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7Q29udGV4dFN0YXRlfSBmcm9tICcuLi90eXBlcy9jb250ZXh0LXN0YXRlJztcclxuaW1wb3J0IHtDb250ZXh0TWVudUl0ZW19IGZyb20gJy4uL3R5cGVzL2NvbnRleHQtbWVudS1pdGVtJztcclxuaW1wb3J0IHtIb3RrZXksIEhvdGtleXNTZXJ2aWNlfSBmcm9tICdhbmd1bGFyMi1ob3RrZXlzJztcclxuaW1wb3J0IHtDb250ZXh0TWVudUVudHJ5fSBmcm9tICcuLi90eXBlcy9jb250ZXh0LW1lbnUtZW50cnknO1xyXG5pbXBvcnQge1N1Ym1lbnV9IGZyb20gJy4uL3R5cGVzL3N1Ym1lbnUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4clNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIGNvbnRleHQ6IENvbnRleHRNZW51RW50cnlbXSA9IFtdO1xyXG4gIHByaXZhdGUgY3VycmVudENvbnRleHQ6IENvbnRleHRNZW51RW50cnlbXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIGNvbnRleHRTdGF0ZVN1YmplY3Q6IFN1YmplY3Q8Q29udGV4dFN0YXRlPiA9IG5ldyBTdWJqZWN0PENvbnRleHRTdGF0ZT4oKTtcclxuICBwcml2YXRlIGNvbnRleHRTdGF0ZU9ic2VydmFibGU6IE9ic2VydmFibGU8Q29udGV4dFN0YXRlPiA9IHRoaXMuY29udGV4dFN0YXRlU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBob3RrZXlzU2VydmljZTogSG90a2V5c1NlcnZpY2UpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCB0aGUgY3VycmVudCBjb250ZXh0XHJcbiAgICovXHJcbiAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgdGhpcy5jdXJyZW50Q29udGV4dCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgY29udGV4dFxyXG4gICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICogQHBhcmFtIGFyZ3VtZW50c1xyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRDdXJyZW50Q29udGV4dChjb250ZXh0OiBzdHJpbmcsIGFyZ3M6IGFueSkge1xyXG4gICAgdGhpcy5hZGRJdGVtc0luQ29udGV4dCh0aGlzLmNvbnRleHQsIGNvbnRleHQsIGFyZ3MpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYSBjb250ZXh0IG1lbnUgcGVyc29uIHRvIHNob3cgdXAgYXQgc29tZSBjb250ZXh0XHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBwdWJsaWMgcmVnaXN0ZXJDb250ZXh0TWVudUl0ZW0oY29udGV4dDogQ29udGV4dE1lbnVFbnRyeSk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZXh0LnB1c2goY29udGV4dCk7XHJcbiAgICBpZiAoKGNvbnRleHQgYXMgYW55KS5ob3RrZXkgJiYgIChjb250ZXh0IGFzIGFueSkuaG90a2V5KSB7XHJcbiAgICAgIHRoaXMuaG90a2V5c1NlcnZpY2UuYWRkKG5ldyBIb3RrZXkoKGNvbnRleHQgYXMgYW55KS5ob3RrZXksIChldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIChjb250ZXh0IGFzIGFueSkuYWN0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9KSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWdpc3RlciBhbiBhcnJheSBvZiBjb250ZXh0IG1lbnUgaXRlbXNcclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqL1xyXG4gIHB1YmxpYyByZWdpc3RlckNvbnRleHRNZW51SXRlbXMoY29udGV4dDogQ29udGV4dE1lbnVFbnRyeVtdKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5yZWdpc3RlckNvbnRleHRNZW51SXRlbShjb250ZXh0W2ldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHN0YXRlIG9mIHRoZSBjb250ZXh0IG1lbnVcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDb250ZXh0U3RhdGUoKTogT2JzZXJ2YWJsZTxDb250ZXh0U3RhdGU+IHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRleHRTdGF0ZU9ic2VydmFibGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVuIHRoZSBjb250ZXh0IG1lbnVcclxuICAgKi9cclxuICBwdWJsaWMgb3BlbihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5hZGRJdGVtc0luQ29udGV4dCh0aGlzLmNvbnRleHQsICdhbGwnLCBudWxsKTtcclxuICAgIHRoaXMuY29udGV4dFN0YXRlU3ViamVjdC5uZXh0KHtcclxuICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgY29udGV4dDogdGhpcy5jdXJyZW50Q29udGV4dCxcclxuICAgICAgdG9wOiBldmVudC5jbGllbnRZICsgd2luZG93LnBhZ2VZT2Zmc2V0LFxyXG4gICAgICBsZWZ0OiBldmVudC5jbGllbnRYXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciBhbGwgY29udGV4dCBpdGVtcyB3aXRoIG91ciBjb250ZXh0IHN0cmluZ1xyXG4gICAqIEBwYXJhbSBpdGVtc1xyXG4gICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICogQHJldHVybnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEl0ZW1zSW5Db250ZXh0KGl0ZW1zOiBDb250ZXh0TWVudUVudHJ5W10sIGNvbnRleHQ6IHN0cmluZywgYXJnczogYW55KSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICgoaXRlbXNbaV0gYXMgQ29udGV4dE1lbnVJdGVtKS5hY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBhY3Rpb24gPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtc1tpXSkgYXMgQ29udGV4dE1lbnVJdGVtO1xyXG4gICAgICAgIGlmIChhcmdzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBhY3Rpb24uYXJncyA9IGFyZ3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3Rpb24uY29udGV4dC5pbmRleE9mKGNvbnRleHQpICE9PSAtMSkge1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q29udGV4dC5wdXNoKGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKChpdGVtc1tpXSBhcyBTdWJtZW51KS5jaGlsZHJlbikge1xyXG4gICAgICAgIGNvbnN0IHN1Ym1lbnUgPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtc1tpXSkgYXMgU3VibWVudTtcclxuICAgICAgICB0aGlzLmFkZEl0ZW1zSW5Db250ZXh0KFxyXG4gICAgICAgICAgKGl0ZW1zW2ldIGFzIFN1Ym1lbnUpLmNoaWxkcmVuLFxyXG4gICAgICAgICAgY29udGV4dCxcclxuICAgICAgICAgIGFyZ3NcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChzdWJtZW51LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudENvbnRleHQucHVzaChzdWJtZW51KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlIHRoZSBjb250ZXh0IG1lbnVcclxuICAgKi9cclxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbnRleHRTdGF0ZVN1YmplY3QubmV4dCh7XHJcbiAgICAgIG9wZW46IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnQsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRleHRTdGF0ZX0gZnJvbSAnLi4vLi4vdHlwZXMvY29udGV4dC1zdGF0ZSc7XHJcbmltcG9ydCB7Q29udGV4clNlcnZpY2V9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9jb250ZXhyLnNlcnZpY2UnO1xyXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7Q29udGV4dE1lbnVJdGVtfSBmcm9tICcuLi8uLi90eXBlcy9jb250ZXh0LW1lbnUtaXRlbSc7XHJcbmltcG9ydCB7Q29udGV4dE1lbnVFbnRyeX0gZnJvbSAnLi4vLi4vdHlwZXMvY29udGV4dC1tZW51LWVudHJ5JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY3R4LWNvbnRleHQtbWVudScsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2XHJcbiAgKGNvbnRleHRtZW51KT1cIm9uQ29udGV4dE1lbnUoJGV2ZW50KVwiXHJcbiAgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXHJcbiAgKm5nSWY9XCJvcGVuXCJcclxuICBjbGFzcz1cImNvbnRleHQtbWVudSBtZW51XCJcclxuICBbbmdTdHlsZV09XCJ7J3RvcC5weCc6IGNvbnRleHRTdGF0ZS50b3AsICdsZWZ0LnB4JzogY29udGV4dFN0YXRlLmxlZnR9XCJcclxuPlxyXG4gIDx1bCBjbGFzcz1cImNvbnRleHQtbGlzdFwiPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjb250ZXh0U3RhdGUuY29udGV4dFwiPlxyXG4gICAgICA8Y3R4LWNvbnRleHQtbWVudS1pdGVtICpuZ0lmPVwiaXNBY3Rpb24oaXRlbSlcIiBbaXRlbV09XCJpdGVtXCI+PC9jdHgtY29udGV4dC1tZW51LWl0ZW0+XHJcbiAgICAgIDxjdHgtc3VibWVudSAqbmdJZj1cIiFpc0FjdGlvbihpdGVtKVwiIFtpdGVtXT1cIml0ZW1cIj48L2N0eC1zdWJtZW51PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgPC91bD5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC5jb250ZXh0LW1lbnV7cG9zaXRpb246YWJzb2x1dGV9OjpuZy1kZWVwIC5tZW51e2JhY2tncm91bmQ6I2ZmZjtib3JkZXI6MXB4IHNvbGlkICNhN2E3YTc7Ym94LXNoYWRvdzowIDAgMTBweCAwIHJnYmEoMCwwLDAsLjUpfTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0e21hcmdpbjowO3BhZGRpbmc6MH06Om5nLWRlZXAgLm1lbnUgLmNvbnRleHQtbGlzdCAuY29udGV4dC1saXN0LWl0ZW17bGlzdC1zdHlsZTpub25lO3BhZGRpbmc6NXB4IDdweDttaW4td2lkdGg6MjAwcHg7Y3Vyc29yOnBvaW50ZXJ9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVtIC5mbGV4LWNvbnRhaW5lcntkaXNwbGF5OmZsZXh9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVtIC5zaG9ydGN1dHtmb250LXNpemU6LjhlbTtvcGFjaXR5Oi41O21hcmdpbi1sZWZ0OjEwcHg7bWFyZ2luLXRvcDoycHh9OjpuZy1kZWVwIC5tZW51IC5jb250ZXh0LWxpc3QgLmNvbnRleHQtbGlzdC1pdGVtIC5zdWJtZW51e2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW4tdG9wOi0yMHB4fTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbTpob3ZlcntiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjEpfTo6bmctZGVlcCAubWVudSAuY29udGV4dC1saXN0IC5jb250ZXh0LWxpc3QtaXRlbTpob3Zlcj4uc3VibWVudXtkaXNwbGF5OmJsb2NrfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwdWJsaWMgb3BlbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBjb250ZXh0U3RhdGU6IENvbnRleHRTdGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0U3RhdGVTdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGNvbnRleHI6IENvbnRleHJTZXJ2aWNlKSB7XHJcbiAgICAvLyBFdmVudCBjYXB0dXJpbmcgKG5vdCBwb3NzaWJsZSBpbiByZWFsIEFuZ3VsYXIgeWV0KVxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc29sZS5sb2coJ1Jlc2V0IGNvbnRleHQgbWVudSBhbmQgcHJldmVudCBkZWZhdWx0Jyk7XHJcbiAgICAgIHRoaXMuY29udGV4ci5yZXNldCgpO1xyXG4gICAgfSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZSB0aGUgY29udGV4dCBtZW51IHdoZW4gd2UgY2xpY2sgc29tZXdoZXJlIGVsc2VcclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycpXHJcbiAgb25Eb2N1bWVudENsaWNrKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZXhyLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcmV2ZW50IGEgcmlnaHQgY2xpY2sgZnJvbSB0aGUgY29udGV4dCBtZW51IHRvIHByb3BhZ2F0ZSBmdXJ0aGVyXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgb25Db250ZXh0TWVudShldmVudCk6IHZvaWQge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcmV2ZW50IGEgY2xpY2sgZnJvbSB0aGUgY29udGV4dCBtZW51IHRvIHByb3BhZ2F0ZSBmdXJ0aGVyXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgb25DbGljayhldmVudCk6IHZvaWQge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IGNvbnRleHQgbWVudSBmb3Igb3VyIGNvbnRleHQgb3IgZm9yIGFsbFxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNvbnRleHRtZW51JywgWyckZXZlbnQnXSlcclxuICBvbkRvY3VtZW50Q29udGV4dE1lbnUoZXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdPcGVuIGNvbnRleHQgbWVudScpO1xyXG4gICAgdGhpcy5jb250ZXhyLm9wZW4oZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjb250ZXh0IG1lbnUgc3RhdGVcclxuICAgKi9cclxuICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbnRleHRTdGF0ZVN1YiA9IHRoaXMuY29udGV4ci5nZXRDb250ZXh0U3RhdGUoKS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XHJcbiAgICAgIHRoaXMuY29udGV4dFN0YXRlID0gdmFsdWU7XHJcbiAgICAgIHRoaXMub3BlbiA9ICEhdGhpcy5jb250ZXh0U3RhdGUuY29udGV4dDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWIgZnJvbSB0aGUgY29udGV4dCBtZW51IHN0YXRlXHJcbiAgICovXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQgIHtcclxuICAgIHRoaXMuY29udGV4dFN0YXRlU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiB0aGlzIGlzIGFuIGFjdGlvblxyXG4gICAqIEBwYXJhbSBpdGVtXHJcbiAgICogQHJldHVybnNcclxuICAgKi9cclxuICBwdWJsaWMgaXNBY3Rpb24oaXRlbTogQ29udGV4dE1lbnVFbnRyeSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhKGl0ZW0gYXMgQ29udGV4dE1lbnVJdGVtKS5hY3Rpb247XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udGV4dE1lbnVJdGVtfSBmcm9tICcuLi8uLi90eXBlcy9jb250ZXh0LW1lbnUtaXRlbSc7XG5pbXBvcnQge1N1Ym1lbnV9IGZyb20gJy4uLy4uL3R5cGVzL3N1Ym1lbnUnO1xuaW1wb3J0IHtDb250ZXh0TWVudUVudHJ5fSBmcm9tICcuLi8uLi90eXBlcy9jb250ZXh0LW1lbnUtZW50cnknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjdHgtc3VibWVudScsXG4gIHRlbXBsYXRlOiBgPGxpIGNsYXNzPVwiY29udGV4dC1saXN0LWl0ZW1cIj5cbiAgPGRpdiBjbGFzcz1cImZsZXgtY29udGFpbmVyXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJjb250ZXh0XCI+e3tpdGVtLnRleHR9fTwvc3Bhbj5cbiAgICA8c3BhbiBzdHlsZT1cImZsZXg6IDEgMSBhdXRvO1wiPjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cInNob3J0Y3V0XCI+Pj4+PC9zcGFuPlxuICA8L2Rpdj5cbiAgPHVsIGNsYXNzPVwiY29udGV4dC1saXN0IHN1Ym1lbnUgbWVudVwiIFtuZ1N0eWxlXT1cInN1Yk1lbnVTdHlsZVwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHN1Ykl0ZW0gb2YgaXRlbS5jaGlsZHJlblwiPlxuICAgICAgPGN0eC1jb250ZXh0LW1lbnUtaXRlbSAqbmdJZj1cImlzQWN0aW9uKHN1Ykl0ZW0pXCIgW2l0ZW1dPVwic3ViSXRlbVwiPjwvY3R4LWNvbnRleHQtbWVudS1pdGVtPlxuICAgICAgPGN0eC1zdWJtZW51ICpuZ0lmPVwiIWlzQWN0aW9uKHN1Ykl0ZW0pXCIgW2l0ZW1dPVwic3ViSXRlbVwiPjwvY3R4LXN1Ym1lbnU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvdWw+XG48L2xpPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFN1Ym1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGl0ZW06IFN1Ym1lbnU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKSB7IH1cblxuICBwdWJsaWMgc3ViTWVudVN0eWxlID0ge307XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLnN1Yk1lbnVTdHlsZSA9IHtcbiAgICAgICdsZWZ0JzogMjE0ICsgJ3B4JyxcbiAgICAgICd0b3AnOiByZWN0Lm9mZnNldEhlaWdodCArICdweCdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgaXMgYW4gYWN0aW9uXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwdWJsaWMgaXNBY3Rpb24oaXRlbTogQ29udGV4dE1lbnVFbnRyeSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIShpdGVtIGFzIENvbnRleHRNZW51SXRlbSkuYWN0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udGV4dE1lbnVJdGVtfSBmcm9tICcuLi8uLi90eXBlcy9jb250ZXh0LW1lbnUtaXRlbSc7XHJcbmltcG9ydCB7Q29udGV4clNlcnZpY2V9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9jb250ZXhyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjdHgtY29udGV4dC1tZW51LWl0ZW0nLFxyXG4gIHRlbXBsYXRlOiBgPGxpIChjbGljayk9XCJhY3QoKVwiIGNsYXNzPVwiY29udGV4dC1saXN0LWl0ZW1cIj5cclxuICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwiY29udGV4dFwiPnt7aXRlbS50ZXh0fX08L3NwYW4+XHJcbiAgICA8c3BhbiBzdHlsZT1cImZsZXg6IDEgMSBhdXRvO1wiPjwvc3Bhbj5cclxuICAgIDxzcGFuIGNsYXNzPVwic2hvcnRjdXRcIj57e2l0ZW0uaG90a2V5fX08L3NwYW4+XHJcbiAgPC9kaXY+XHJcbjwvbGk+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSBpdGVtOiBDb250ZXh0TWVudUl0ZW07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4cjogQ29udGV4clNlcnZpY2UpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGwgYW4gYWN0aW9uIGFuZCBjbG9zZSB0aGUgY29udGV4dCBtZW51XHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBwdWJsaWMgYWN0KCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2codGhpcy5pdGVtKTtcclxuICAgIHRoaXMuaXRlbS5hY3Rpb24odGhpcy5pdGVtLmFyZ3MpO1xyXG4gICAgdGhpcy5jb250ZXhyLmNsb3NlKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7RGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250ZXhyU2VydmljZX0gZnJvbSAnY29udGV4ci9saWIvcHJvdmlkZXJzL2NvbnRleHIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tjdHhdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dERpcmVjdGl2ZSB7XHJcbiAgQElucHV0KCdjdHgnKSBjdHg6IHN0cmluZztcclxuICBASW5wdXQoJ2N0eEFyZ3MnKSBjdHhBcmdzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4cjogQ29udGV4clNlcnZpY2UpIHt9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25Db250ZXh0TWVudShldmVudCkge1xyXG4gICAgY29uc29sZS5sb2coJ0FkZGluZyBjb250ZXh0OiAnICsgdGhpcy5jdHggKyAnIHdpdGggYXJnczogJyArIHRoaXMuY3R4QXJncyk7XHJcbiAgICB0aGlzLmNvbnRleHIuYWRkQ3VycmVudENvbnRleHQodGhpcy5jdHgsIHRoaXMuY3R4QXJncyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRleHRNZW51Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvY29udGV4dC1tZW51L2NvbnRleHQtbWVudS5jb21wb25lbnQnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtDb250ZXhyU2VydmljZX0gZnJvbSAnLi9wcm92aWRlcnMvY29udGV4ci5zZXJ2aWNlJztcclxuaW1wb3J0IHtIb3RrZXlNb2R1bGV9IGZyb20gJ2FuZ3VsYXIyLWhvdGtleXMnO1xyXG5pbXBvcnQge1N1Ym1lbnVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9zdWJtZW51L3N1Ym1lbnUuY29tcG9uZW50JztcclxuaW1wb3J0IHtDb250ZXh0TWVudUl0ZW1Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9jb250ZXh0LW1lbnUtaXRlbS9jb250ZXh0LW1lbnUtaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb250ZXh0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbnRleHQuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSG90a2V5TW9kdWxlLmZvclJvb3QoKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBDb250ZXh0TWVudUNvbXBvbmVudCxcclxuICAgIFN1Ym1lbnVDb21wb25lbnQsXHJcbiAgICBDb250ZXh0TWVudUl0ZW1Db21wb25lbnQsXHJcbiAgICBDb250ZXh0RGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBDb250ZXh0TWVudUNvbXBvbmVudCxcclxuICAgIENvbnRleHREaXJlY3RpdmVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ29udGV4clNlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXhyTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyIsIlN1YmplY3QiLCJIb3RrZXkiLCJJbmplY3RhYmxlIiwiSG90a2V5c1NlcnZpY2UiLCJDb21wb25lbnQiLCJIb3N0TGlzdGVuZXIiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJEaXJlY3RpdmUiLCJDb250ZXhyU2VydmljZSIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiSG90a2V5TW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO2FBQ2hDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBRUYsdUJBQTBCLENBQUMsRUFBRSxDQUFDO1FBQzFCLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsZ0JBQWdCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDdkMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElB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