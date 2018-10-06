export interface Context {
  text: string;
  context: string[];
  action: () => void;
  hotkey?: string | string[];
}
