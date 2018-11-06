import { OnDestroy, OnInit } from '@angular/core';
import { ContextState } from '../../types/context-state';
import { ContexrService } from '../../providers/contexr.service';
import { ContextMenuEntry } from '../../types/context-menu-entry';
export declare class ContextMenuComponent implements OnInit, OnDestroy {
    contexr: ContexrService;
    open: boolean;
    contextState: ContextState;
    private contextStateSub;
    constructor(contexr: ContexrService);
    /**
     * Close the context menu when we click somewhere else
     */
    onDocumentClick(): void;
    /**
     * Prevent a right click from the context menu to propagate further
     * @param event
     */
    onContextMenu(event: any): void;
    /**
     * Prevent a click from the context menu to propagate further
     * @param event
     */
    onClick(event: any): void;
    /**
     * Show context menu for our context or for all
     * @param event
     */
    onDocumentContextMenu(event: any): void;
    /**
     * Subscribe to the context menu state
     */
    ngOnInit(): void;
    /**
     * Unsub from the context menu state
     */
    ngOnDestroy(): void;
    /**
     * Check if this is an action
     * @param item
     * @returns
     */
    isAction(item: ContextMenuEntry): boolean;
}
