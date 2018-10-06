import {Context} from './context';

export interface ContextState {
  open: boolean;
  context?: Context[];
  top?: number;
  left?: number;
}
