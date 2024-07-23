import { MenuItem, Option, Submenu } from "../types/menu-item";

export class MenuMerger {

    /**
   * Recursively merge options and submenus
   * @param menu1 
   * @param menu2 
   * @returns 
   */
  public static mergeMenus(menu1: MenuItem[], menu2: MenuItem[]): MenuItem[] {
    let mergedItems: MenuItem[] = menu1.slice();
    for (let item of menu2) {
      if ((item as Option).action) {
        // If this is an option, just push it into the merged menu
        mergedItems.push(item);

      } else if ((item as Submenu).items) {
        let existingSubmenu = mergedItems.find(x => (x as Submenu).items && x.label === item.label) as Submenu;

        if (existingSubmenu && (item as Submenu).items) {
          // If this is a submenu, merge the items and put them in the existing submenu
          existingSubmenu.items = this.mergeMenus((existingSubmenu as Submenu).items, (item as Submenu).items);
        } else {
          // If a submenu with the same label is not found, just push a copy into the merged menu
          mergedItems.push({
            label: item.label,
            priority: item.priority,
            items: (item as Submenu).items.slice()
          });
        }
      } else if (item.label = "separator") {
        mergedItems.push(item);
      }
    }
    return mergedItems.sort((a, b) => {
      return (a.priority ? a.priority : 0) - (b.priority ? b.priority : 0)
    });
  }
}