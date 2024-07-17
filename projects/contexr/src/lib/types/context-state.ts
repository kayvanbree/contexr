import {Submenu} from './submenu';
import {Option} from './option';

export class ContextState {
  public open: boolean = false;
  public menu?: Array<Option | Submenu> = [];
  public top?: number = 0;
  public left?: number = 0;
}
