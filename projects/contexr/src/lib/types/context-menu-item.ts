import {ContextMenuEntry} from './context-menu-entry';

export class ContextMenuItem extends ContextMenuEntry {
  id?: string;
  context: string[];
  action: (args: any) => void;
  hotkey?: string | string[];
  args?: any;
  hideMenu?: boolean;
  icon?: boolean;
  inContext?: boolean;
  condition?: (args: any) => boolean;
}
