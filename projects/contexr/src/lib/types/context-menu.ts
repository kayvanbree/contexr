import {Option as Option} from './option';
import {Submenu} from './submenu';

export class ContextMenu {
    constructor(public entries: Array<Option | Submenu>){}

    public addMenu(menu: ContextMenu) {
        this.entries = this.entries.concat(menu.entries);
        // TODO: Merge entries so submenus with the same name are not duplicated
    }

    /**
     * Merge the entries of a menu recursively
     * @param menu1 
     * @param menu2 
     */
    private static mergeEntries(menu1: Array<Option | Submenu>, menu2: Array<Option | Submenu>): Array<Option | Submenu> {
        for (let i = 0; i < menu2.length; i++) {
            if (menu2[i] instanceof Option && menu1.indexOf(menu2[i]) === -1) {
                // Insert option if it does not exist yet
                const entry = Object.assign({}, menu2[i]) as Option;
                menu1.push(entry);
            } 
            // else if (menu2[i] instanceof Submenu) {
            //     // Look for the index of a submenu with the same text
            //     var index = menu1.findIndex(x => x instanceof Submenu && x.text === menu2[i].text);
            //     if (index === -1) {
            //         // Insert submenu if it does not exist yet
            //         const entry = Object.assign({}, menu2[i]) as Submenu;
            //         index = menu1.push(entry);
            //     }
            //     // Merge submenus entries
            //     this.mergeEntries((menu1[index] as Submenu).entries, (menu2[i] as Submenu).entries);
            // }
        }
        return menu1;
    }
}