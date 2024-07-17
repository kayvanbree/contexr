export class Option {
  public text: string = "option";
  public context: string[] = [];
  public action: (args: any) => void = () => {};
  public hotkey?: string | string[];
  public args?: any;
  public hideMenu?: boolean;

  public constructor(init?:Partial<Option>) {
    Object.assign(this, init);
  }
}