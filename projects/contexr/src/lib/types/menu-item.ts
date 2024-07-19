import { Hotkey } from "angular2-hotkeys";

export interface BaseMenuItem {
    /**
     * The label for this menu item
     */
    label: string;

    /**
     * The priority of this menu item in the menu
     */
    priority?: number;
}

export interface Option<T = any> extends BaseMenuItem {
    /**
     * A callback method called when clicking on the menu item
     */
    action: (args?: T) => any;

    /**
     * The hotkey that does the same as this context menu option
     */
    hotkey?: string;

    /**
     * Arguments passed along to the callback (action)
     */
    args?: () => T;
}

export interface Submenu extends BaseMenuItem {
    /**
     * A submenu with its own items
     */
    items: MenuItem[];
}

export interface Separator extends BaseMenuItem {}

export type MenuItem<T = any> = Submenu | Option | Separator;