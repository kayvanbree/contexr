import { Observable } from 'rxjs';
import { ContextState } from '../types/context-state';
import { HotkeysService } from 'angular2-hotkeys';
import { ContextMenuEntry } from '../types/context-menu-entry';
export declare class ContexrService {
    private hotkeysService;
    private context;
    private currentContext;
    private contextStateSubject;
    private contextStateObservable;
    constructor(hotkeysService: HotkeysService);
    /**
     * Reset the current context
     */
    reset(): void;
    /**
     * Add a context
     * @param context
     * @param arguments
     */
    addCurrentContext(context: string, args: any): void;
    /**
     * Register a context menu person to show up at some context
     * @param context
     */
    registerContextMenuItem(context: ContextMenuEntry): void;
    /**
     * Register an array of context menu items
     * @param context
     */
    registerContextMenuItems(context: ContextMenuEntry[]): void;
    /**
     * Returns the state of the context menu
     * @returns
     */
    getContextState(): Observable<ContextState>;
    /**
     * Open the context menu
     */
    open(event: MouseEvent): void;
    /**
     * Filter all context items with our context string
     * @param items
     * @param context
     * @returns
     */
    private addItemsInContext(items, context, args);
    /**
     * Close the context menu
     */
    close(): void;
}
