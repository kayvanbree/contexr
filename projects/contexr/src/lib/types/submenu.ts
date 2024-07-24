import { BaseMenuItem } from "./base-menu-item";
import { MenuItem } from "./menu-item";

export interface Submenu extends BaseMenuItem {
    /**
     * A submenu with its own items
     */
    items: MenuItem[];
}