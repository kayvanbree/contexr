import { BaseMenuItem } from "./base-menu-item";

export interface Option<T = any> extends BaseMenuItem {
    /**
     * A callback method called when clicking on the menu item
     */
    action: (args?: T) => any;

    /**
     * The hotkey that does the same as this context menu option.
     * For the hotkeys available check https://github.com/ccampbell/mousetrap
     */
    hotkey?: string;

    /**
     * Arguments passed along to the callback (action)
     */
    args?: () => T;
}