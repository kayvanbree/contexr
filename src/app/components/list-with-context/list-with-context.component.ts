import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ContexrService} from 'contexr/lib/providers/contexr.service';
import {MatRow, MatTableDataSource} from '@angular/material';
import {ContextMenuEntry} from 'contexr/lib/types/context-menu-entry';

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
      text: 'Add element',
      context: ['element-list'],
      action: (args: any) => {
        args.list.addElement();
      },
      hotkey: 'a'
    },
    {
      text: 'Delete element',
      context: ['element'],
      action: (args: any) => {
        args.list.removeSelection();
      },
      hotkey: 'del'
    },
    {
      text: 'Select previous',
      context: ['element'],
      action: (args: any) => {
        args.list.selectPrevious();
      },
      hotkey: 'up',
      hasMenu: false
    },
    {
      text: 'Select next',
      context: ['element'],
      action: (args: any) => {
        args.list.selectNext();
      },
      hotkey: 'down',
      hasMenu: false
    }
  ];

  constructor(private contexr: ContexrService, private changeDetector: ChangeDetectorRef) {
    this.contexr.registerContextMenuItems(this.context);
  }

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.elements);
  }

  public onSelectRow(event: MouseEvent, row: any): void {
    if (event && event.ctrlKey) {
      this.selected.push(row);
    } else {
      this.selected = [row];
    }
  }

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

  private selectPrevious() {
    const minSelected = this.getMinSelectedIndex();
    if (minSelected > 0) {
      this.selectAtIndex(minSelected - 1);
    }
  }

  private selectNext() {
    const maxSelected = this.getMaxSelectedIndex();
    if (maxSelected < this.elements.length) {
      this.selectAtIndex(maxSelected + 1);
    }
  }

  private selectAtIndex(index: number): void {
    if (this.rows.toArray()[index]) {
      this.rows.toArray()[index].nativeElement.click();
    }
  }

  private getMinSelectedIndex() {
    return Math.min.apply(Math, this.selected.map((o) => {
      return this.elements.indexOf(o);
    }));
  }

  private getMaxSelectedIndex() {
    return Math.max.apply(Math, this.selected.map((o) => {
      return this.elements.indexOf(o);
    }));
  }

  private addElement() {
    this.elements.push(
      {position: this.elements.length + 1, name: '', weight: 0, symbol: ''}
    );
    this.dataSource = new MatTableDataSource(this.elements);
  }
}
