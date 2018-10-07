export interface ContextMenuEntry {
  text: string;
}

export interface ContextMenuItem extends ContextMenuEntry {
  context: string[];
  action: () => void;
  hotkey?: string | string[];
}

export interface Submenu extends ContextMenuEntry {
  children: ContextMenuEntry[];
}
