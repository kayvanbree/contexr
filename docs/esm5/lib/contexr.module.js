/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { CommonModule } from '@angular/common';
import { ContexrService } from './providers/contexr.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { ContextMenuItemComponent } from './components/context-menu-item/context-menu-item.component';
import { ContextDirective } from './directives/context.directive';
var ContexrModule = /** @class */ (function () {
    function ContexrModule() {
    }
    ContexrModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HotkeyModule.forRoot()
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
export { ContexrModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4ci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb250ZXhyLyIsInNvdXJjZXMiOlsibGliL2NvbnRleHIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDREQUE0RCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7OztnQkFFakUsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVksQ0FBQyxPQUFPLEVBQUU7cUJBQ3ZCO29CQUNELFlBQVksRUFBRTt3QkFDWixvQkFBb0I7d0JBQ3BCLGdCQUFnQjt3QkFDaEIsd0JBQXdCO3dCQUN4QixnQkFBZ0I7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxvQkFBb0I7d0JBQ3BCLGdCQUFnQjtxQkFDakI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULGNBQWM7cUJBQ2Y7aUJBQ0Y7O3dCQTNCRDs7U0E0QmEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRleHRNZW51Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvY29udGV4dC1tZW51L2NvbnRleHQtbWVudS5jb21wb25lbnQnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtDb250ZXhyU2VydmljZX0gZnJvbSAnLi9wcm92aWRlcnMvY29udGV4ci5zZXJ2aWNlJztcclxuaW1wb3J0IHtIb3RrZXlNb2R1bGV9IGZyb20gJ2FuZ3VsYXIyLWhvdGtleXMnO1xyXG5pbXBvcnQge1N1Ym1lbnVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9zdWJtZW51L3N1Ym1lbnUuY29tcG9uZW50JztcclxuaW1wb3J0IHtDb250ZXh0TWVudUl0ZW1Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9jb250ZXh0LW1lbnUtaXRlbS9jb250ZXh0LW1lbnUtaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb250ZXh0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbnRleHQuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSG90a2V5TW9kdWxlLmZvclJvb3QoKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBDb250ZXh0TWVudUNvbXBvbmVudCxcclxuICAgIFN1Ym1lbnVDb21wb25lbnQsXHJcbiAgICBDb250ZXh0TWVudUl0ZW1Db21wb25lbnQsXHJcbiAgICBDb250ZXh0RGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBDb250ZXh0TWVudUNvbXBvbmVudCxcclxuICAgIENvbnRleHREaXJlY3RpdmVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ29udGV4clNlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXhyTW9kdWxlIHt9XHJcbiJdfQ==