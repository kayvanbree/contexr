import { MenuItem } from './menu-item';

export interface ContextState {
  open: boolean;
  items?: MenuItem[];
  top?: number;
  left?: number;
}
