import { MenuItem } from "../types/menu-item";
import { MenuMerger } from "./menu-merger";

describe('MenuMerger', () => {
    it('should merge options', () => {
        let menu1: MenuItem[] = [
            {
                label: "Menu 1 subitem",
                action: () => {},
                hotkey: 'a'
            }
        ];

        let menu2: MenuItem[] = [
            {
                label: "Menu 2 subitem",
                action: () => {},
                hotkey: 'b'
            }
        ];

        let expectedMenu: MenuItem[] = [
            {
                label: "Menu 1 subitem",
                action: () => {},
                hotkey: 'a'
            },
            {
                label: "Menu 2 subitem",
                action: () => {},
                hotkey: 'b'
            }
        ];

        const mergedMenus = MenuMerger.mergeMenus(menu1, menu2);
        expect(JSON.stringify(expectedMenu)).toBe(JSON.stringify(mergedMenus));
    });

    it('should merge submenus', () => {
        let menu1: MenuItem[] = [
            {
              label: "Submenu",
              items: [
                {
                  label: "Menu 1 subitem",
                  action: () => {},
                  hotkey: 'a'
                }
              ]
            }
        ];

        let menu2: MenuItem[] = [
            {
              label: "Submenu",
              items: [
                {
                  label: "Menu 2 subitem",
                  action: () => {},
                  hotkey: 'b'
                }
              ]
            }
        ];

        let expectedMenu: MenuItem[] = [
            {
              label: "Submenu",
              items: [
                {
                  label: "Menu 1 subitem",
                  action: () => {},
                  hotkey: 'a'
                },
                {
                  label: "Menu 2 subitem",
                  action: () => {},
                  hotkey: 'b'
                }
              ]
            }
        ];

        const mergedMenus = MenuMerger.mergeMenus(menu1, menu2);
        expect(JSON.stringify(expectedMenu)).toBe(JSON.stringify(mergedMenus));
    });

    it('should merge with order', () => {
        let menu1: MenuItem[] = [
            {
                label: "Menu 1 subitem",
                action: () => {},
                order: 100
            }
        ];

        let menu2: MenuItem[] = [
            {
                label: "Menu 2 subitem",
                action: () => {},
                order: -100
            }
        ];

        let expectedMenu: MenuItem[] = [
            {
                label: "Menu 2 subitem",
                action: () => {},
                order: -100
            },
            {
                label: "Menu 1 subitem",
                action: () => {},
                order: 100
            }
        ];

        const mergedMenus = MenuMerger.mergeMenus(menu1, menu2);
        expect(JSON.stringify(expectedMenu)).toBe(JSON.stringify(mergedMenus));
    });

    it('should merge submenus with order', () => {
        let menu1: MenuItem[] = [
            {
              label: "Submenu",
              items: [
                {
                  label: "Menu 1 subitem",
                  action: () => {},
                  order: 100
                }
              ]
            }
        ];

        let menu2: MenuItem[] = [
            {
              label: "Submenu",
              items: [
                {
                  label: "Menu 2 subitem",
                  action: () => {},
                  order: -100
                }
              ]
            }
        ];

        let expectedMenu: MenuItem[] = [
            {
              label: "Submenu",
              items: [
                {
                    label: "Menu 2 subitem",
                    action: () => {},
                    order: -100
                },
                {
                  label: "Menu 1 subitem",
                  action: () => {},
                  order: 100
                }
              ]
            }
        ];

        const mergedMenus = MenuMerger.mergeMenus(menu1, menu2);
        expect(JSON.stringify(expectedMenu)).toBe(JSON.stringify(mergedMenus));
    });

    it('should merge deep submenus', () => {
        let menu1: MenuItem[] = [
            {
                label: "Submenu",
                items: [
                    {
                        label: "Another submenu",
                        items: [
                            {
                                label: "Menu 1 subitem",
                                action: () => {}
                            }
                        ]
                    }
                ]
            }
        ];

        let menu2: MenuItem[] = [
            {
                label: "Submenu",
                items: [
                    {
                        label: "Another submenu",
                        items: [
                            {
                                label: "Menu 2 subitem",
                                action: () => {}
                            }
                        ]
                    }
                ]
            }
        ];

        let expectedMenu: MenuItem[] = [
            {
                label: "Submenu",
                items: [
                    {
                        label: "Another submenu",
                        items: [
                            {
                                label: "Menu 1 subitem",
                                action: () => {}
                            },
                            {
                                label: "Menu 2 subitem",
                                action: () => {}
                            }
                        ]
                    }
                    
                ]
            }
        ];

        const mergedMenus = MenuMerger.mergeMenus(menu1, menu2);
        expect(JSON.stringify(expectedMenu)).toBe(JSON.stringify(mergedMenus));
    });

    it('should merge dividers', () => {
        let menu1: MenuItem[] = [
            {
                label: "Menu 1 subitem",
                action: () => {},
                order: -100
            },
            {
                divider: true,
                order: 0
            }
        ];

        let menu2: MenuItem[] = [
            {
                label: "Menu 2 subitem",
                action: () => {},
                order: 100
            }
        ];

        let expectedMenu: MenuItem[] = [
            {
                label: "Menu 1 subitem",
                action: () => {},
                order: -100
            },
            {
                divider: true,
                order: 0
            },
            {
                label: "Menu 2 subitem",
                action: () => {},
                order: 100
            }
        ];

        const mergedMenus = MenuMerger.mergeMenus(menu1, menu2);
        expect(JSON.stringify(expectedMenu)).toBe(JSON.stringify(mergedMenus));
    });

    it('should treat undefined order as 0', () => {
        let menu1: MenuItem[] = [
            {
                label: "Menu 1 subitem",
                action: () => {},
                order: 100
            }
        ];

        let menu2: MenuItem[] = [
            {
                label: "Menu 2 subitem",
                action: () => {},
                order: -100
            },
            {
                label: "Item without order",
                action: () => {}
            }
        ];

        let expectedMenu: MenuItem[] = [
            {
                label: "Menu 2 subitem",
                action: () => {},
                order: -100
            },
            {
                label: "Item without order",
                action: () => {}
            },
            {
              label: "Menu 1 subitem",
              action: () => {},
              order: 100
            }
        ];

        const mergedMenus = MenuMerger.mergeMenus(menu1, menu2);
        expect(JSON.stringify(expectedMenu)).toBe(JSON.stringify(mergedMenus));
    });
});