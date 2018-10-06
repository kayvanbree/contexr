export interface ContextMenuItem {
  text: string;
  context: string[];
  action: () => void;
  hotkey?: string | string[];
}
