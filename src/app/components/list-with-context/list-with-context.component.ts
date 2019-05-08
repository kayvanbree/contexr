import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ContexrService} from 'contexr/lib/providers/contexr.service';
import {MatRow, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-list-with-context',
  templateUrl: './list-with-context.component.html',
  styleUrls: ['./list-with-context.component.css']
})
export class ListWithContextComponent implements OnInit {
  @Input()
  public elements: any[];

  @ViewChildren(MatRow, { read: ElementRef })
  public rows !: QueryList<ElementRef>;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  selected;

  context = [
    {
      id: 'add-item',
      text: 'Add element',
      context: ['element-list'],
      action: (args: any) => {
        args.list.addElement();
      },
      hotkey: 'ins',
      icon: 'fas fa-plus'
    },
    {
      text: 'Delete element',
      context: ['element'],
      action: (args: any) => {
        args.list.removeSelection();
      },
      hotkey: 'del',
      icon: 'far fa-trash-alt'
    }
    ,
    {
      text: 'Lalalala',
      context: ['element'],
      action: (args: any) => {
        console.log('Lalalala');
      },
      icon: 'far fa-comment'
    }
  ];

  constructor(private contexr: ContexrService, private changeDetector: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.contexr.registerContextMenuItems(this.context);
    this.dataSource = new MatTableDataSource(this.elements);
  }

  /**
   * Select a row, use ctrl + click to select multiple
   * @param event
   * @param row
   */
  public onSelectRow(event: MouseEvent, row: any): void {
    if (event && event.ctrlKey) {
      this.selected.push(row);
    } else {
      this.selected = [row];
    }
  }

  /**
   * Remove the selected elements from this list
   */
  private removeSelection() {
    let index;
    const maxSelectedIndex = this.getMaxSelectedIndex();
    const newSelection = maxSelectedIndex - this.selected.length + 1;

    for (let i = 0; i < this.selected.length; i++) {

      index = this.elements.indexOf(this.selected[i]);
      if (index > -1) {
        this.elements.splice(index, 1);
      }
    }

    this.dataSource = new MatTableDataSource(this.elements);
    this.changeDetector.detectChanges();

    if (this.rows.toArray()[newSelection]) {
      this.selectAtIndex(newSelection);
    } else if (this.rows.toArray()[newSelection - 1]) {
      this.selectAtIndex(newSelection - 1);
    }
  }

  /**
   * Click on the previous element to get into context
   */
  private selectPrevious() {
    const minSelected = this.getMinSelectedIndex();
    if (minSelected > 0) {
      this.selectAtIndex(minSelected - 1);
    }
  }

  /**
   * Click on the next element to get it into context
   */
  private selectNext() {
    const maxSelected = this.getMaxSelectedIndex();
    if (maxSelected < this.elements.length) {
      this.selectAtIndex(maxSelected + 1);
    }
  }

  /**
   * Click on the element at this index to get it into context
   * @param index
   */
  private selectAtIndex(index: number): void {
    if (this.rows.toArray()[index]) {
      this.rows.toArray()[index].nativeElement.click();
    }
  }

  /**
   * Returns the first index of the selection
   */
  private getMinSelectedIndex() {
    return Math.min.apply(Math, this.selected.map((o) => {
      return this.elements.indexOf(o);
    }));
  }

  /**
   * Returns the last index of the selection
   */
  private getMaxSelectedIndex() {
    return Math.max.apply(Math, this.selected.map((o) => {
      return this.elements.indexOf(o);
    }));
  }

  /**
   * This adds a new empty element to the list
   */
  private addElement() {
    this.elements.push(
      {position: this.elements.length + 1, name: '', weight: 0, symbol: ''}
    );
    this.dataSource = new MatTableDataSource(this.elements);
  }
}
