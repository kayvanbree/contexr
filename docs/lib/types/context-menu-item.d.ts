import { ContextMenuEntry } from './context-menu-entry';
export declare class ContextMenuItem extends ContextMenuEntry {
    context: string[];
    action: (args: any) => void;
    hotkey?: string | string[];
    args?: any;
}
