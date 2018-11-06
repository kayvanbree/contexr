import { OnInit } from '@angular/core';
import { ContextMenuItem } from '../../types/context-menu-item';
import { ContexrService } from '../../providers/contexr.service';
export declare class ContextMenuItemComponent implements OnInit {
    private contexr;
    item: ContextMenuItem;
    constructor(contexr: ContexrService);
    ngOnInit(): void;
    /**
     * Call an action and close the context menu
     * @param context
     */
    act(): void;
}
