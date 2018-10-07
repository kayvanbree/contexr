import {ContextMenuEntry} from './context-menu-item';

export interface ContextState {
  open: boolean;
  context?: ContextMenuEntry[];
  top?: number;
  left?: number;
}
