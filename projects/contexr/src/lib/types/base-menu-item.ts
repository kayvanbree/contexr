export interface BaseMenuItem {
    /**
     * The label for this menu item
     */
    label?: string;

    /**
     * The priority of this menu item in the menu
     */
    priority?: number;

    /**
     * Angular Materials Icon (for example "home" for the home icon)
     */
    icon?: string;
}