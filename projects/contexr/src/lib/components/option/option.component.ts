import {Component, Input} from '@angular/core';
import {ContexrService} from '../../providers/contexr.service';
import { MenuItem, Option } from '../../types/menu-item';

@Component({
  selector: 'ctx-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent {

  /**
   * Converts MenuItem to Option
   */
  @Input() set item(item: MenuItem) {
    this.option = item as Option;
  }
  public option!: Option;

  constructor(private contexr: ContexrService) { }

  /**
   * Call an action and close the context menu
   * @param context
   */
  public act(): void {
    this.option.args ? this.option.action(this.option.args()): this.option.action();
    this.contexr.close();
  }
}
