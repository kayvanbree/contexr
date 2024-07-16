import {ContextMenuEntry} from './context-menu-entry';

export class Submenu extends ContextMenuEntry {
  children!: ContextMenuEntry[];
}
