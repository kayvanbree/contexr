import {ContextMenuEntry} from './context-menu-entry';

export class ContextMenuItem extends ContextMenuEntry {
  public context: string[];
  public action: (args: any) => void;
  public hotkey?: string | string[];

  public args?: any;
  public hideMenu?: boolean;
  public icon?: boolean;
  public inContext?: boolean;
  public condition?: (args: any) => boolean;
}
