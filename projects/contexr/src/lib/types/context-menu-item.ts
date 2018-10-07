import {ContextMenuEntry} from './context-menu-entry';

export class ContextMenuItem extends ContextMenuEntry {
  context: string[];
  action: () => void;
  hotkey?: string | string[];
}
