import { ElementRef, OnChanges } from '@angular/core';
import { Submenu } from '../../types/submenu';
import { ContextMenuEntry } from '../../types/context-menu-entry';
export declare class SubmenuComponent implements OnChanges {
    private element;
    item: Submenu;
    constructor(element: ElementRef);
    subMenuStyle: {};
    ngOnChanges(): void;
    /**
     * Check if this is an action
     * @param item
     * @returns
     */
    isAction(item: ContextMenuEntry): boolean;
}
