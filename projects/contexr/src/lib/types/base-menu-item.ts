export interface BaseMenuItem {
    /**
     * The label for this menu item
     */
    label?: string;

    /**
     * The order of this menu item in the menu. Can be negative.
     */
    order?: number;

    /**
     * Angular Materials Icon (for example "home" for the home icon)
     */
    icon?: string;
}