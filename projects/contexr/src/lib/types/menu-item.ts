export interface BaseMenuItem {
    /**
     * The label for this menu item
     */
    label: string; 
}

export interface Option<T = any> extends BaseMenuItem {
    /**
     * A callback method called when clicking on the menu item
     */
    action: (args: T) => any;

    hotkey: string;

    args: T;
}

export interface Submenu extends BaseMenuItem {
    /**
     * A submenu with its own items
     */
    items: MenuItem[];
}

export interface Separator extends BaseMenuItem {}

export type MenuItem<T = any> = Submenu | Option | Separator;