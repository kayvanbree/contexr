import { Option } from "./option";

export class Submenu {
  public text: string = "option";
  public entries: Array<Option | Submenu> = [];

  public constructor(init?:Partial<Submenu>) {
    Object.assign(this, init);
  }
}
