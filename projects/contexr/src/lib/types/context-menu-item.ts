import {ContextMenuEntry} from './context-menu-entry';

export class ContextMenuItem extends ContextMenuEntry {
  context: string[];
  action: (args: any) => void;
  hotkey?: string | string[];
  args?: any;
  hideMenu?: boolean;
}
