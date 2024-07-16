import {ContextMenuEntry} from './context-menu-entry';

export class ContextState {
  open!: boolean;
  context?: ContextMenuEntry[];
  top?: number;
  left?: number;
}
