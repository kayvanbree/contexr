import {ContextMenuItem} from './context-menu-item';

export interface ContextState {
  open: boolean;
  context?: ContextMenuItem[];
  top?: number;
  left?: number;
}
