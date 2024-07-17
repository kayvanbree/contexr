import {Option as Option} from './option';
import {Submenu} from './submenu';

export class ContextMenu {
    constructor(public entries: Array<Option | Submenu>){}

    /**
     * Add another context menu to this one
     * @param menu 
     */
    public addMenu(menu: ContextMenu) {
        this.entries = this.mergeEntries(this.entries, menu.entries);
    }

    /**
     * Merge the entries of two menus recursively
     * @param menu1 
     * @param menu2 
     */
    private mergeEntries(menu1: Array<Option | Submenu>, menu2: Array<Option | Submenu>): Array<Option | Submenu> {
        for (let i = 0; i < menu2.length; i++) {
            if ((menu2[i] as Option).action) {
                let option = menu2[i] as Option;
                let index = menu1.findIndex(x => JSON.stringify(x) == JSON.stringify(option));
                // Insert option if it does not exist yet
                if (index = -1) {
                    menu1.push(option);
                } else {
                    menu1[index] = option;
                }
            } else if ((menu2[i] as Submenu).entries) {
                let submenu = menu2[i] as Submenu;
                let existingSubmenu = menu1.find(x => (x as Submenu).entries && x.text == submenu.text) as Submenu;
                // Look for the index of a submenu with the same text
                if (existingSubmenu == null) {
                    // Insert submenu if it does not exist yet
                    menu1.push(submenu);
                } else {
                    // Merge submenus
                    existingSubmenu.entries = this.mergeEntries(existingSubmenu.entries, submenu.entries);
                }
            }
        }
        return menu1;
    }
}