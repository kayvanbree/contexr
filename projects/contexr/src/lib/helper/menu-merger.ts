import { Divider } from "../types/divider";
import { MenuItem } from "../types/menu-item";
import { Option } from "../types/option";
import { Submenu } from "../types/submenu";

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
        let existingSubmenu = mergedItems.find(x => (x as Submenu).items && (x as Submenu).label === (item as Submenu).label) as Submenu;

        if (existingSubmenu && (item as Submenu).items) {
          // If this is a submenu, merge the items and put them in the existing submenu
          existingSubmenu.items = this.mergeMenus((existingSubmenu as Submenu).items, (item as Submenu).items);
        } else {
          // If a submenu with the same label is not found, just push a copy into the merged menu
          mergedItems.push({
            label: (item as Submenu).label,
            order: item.order,
            items: (item as Submenu).items.slice()
          });
        }
      } else if ((item as Divider).divider) {
        mergedItems.push(item);
      }
    }

    let sortedItems = mergedItems.sort((a, b) => {
      return (a.order ? a.order : 0) - (b.order ? b.order : 0)
    });

    sortedItems = MenuMerger.trimHeadingDividers(sortedItems);
    sortedItems = MenuMerger.trimTrailingDividers(sortedItems);

    if (mergedItems.length != sortedItems.length) {
      console.log("One or more heading or trailing dividers have been trimmed")
    }
    
    return sortedItems;
  }

  private static trimHeadingDividers(items: MenuItem[]): MenuItem[] {
    while ((items[0] as Divider).divider) {
      items.shift();
    }
    return items;
  }

  private static trimTrailingDividers(items: MenuItem[]): MenuItem[] {
    items = items.reverse();
    while ((items[0] as Divider).divider) {
      items.shift();
    }
    return items.reverse();
  }
}